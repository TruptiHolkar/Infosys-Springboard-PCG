require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(session({ secret: process.env.SESSION_SECRET || 'dev_secret', resave:false, saveUninitialized:true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, cb) => {
  // In production you'd find or create a user in DB here
  return cb(null, profile);
}));

passport.serializeUser((user, done)=> done(null, user));
passport.deserializeUser((obj, done)=> done(null, obj));

// Start OAuth flow
app.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'], prompt: 'select_account' }));

// Callback - create token and redirect to the success page (popup will receive it)
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth/failure' }), (req, res) => {
  const user = req.user;
  const token = jwt.sign({ id: user.id, displayName: user.displayName, emails: user.emails }, process.env.SESSION_SECRET || 'dev_secret', { expiresIn: '1h' });
  // Redirect to a small page which will postMessage the token to opener
  res.redirect(`/auth/success?token=${encodeURIComponent(token)}`);
});

app.get('/auth/failure', (req,res)=> res.send('Authentication failed'));

app.get('/auth/success', (req, res) => {
  // Serve a tiny HTML page that posts the token to window.opener
  const token = req.query.token || '';
  res.send(`<!doctype html>
<html>
  <head><meta charset="utf-8"><title>Auth Success</title></head>
  <body>
    <script>
      (function(){
        try{
          // Post token back to the opener window (main app)
          window.opener.postMessage({ token: '${token}' }, '*');
        }catch(e){ }
        // close popup
        window.close();
      })();
    </script>
    <p>Authentication complete. You can close this window.</p>
  </body>
</html>`);
});

// Serve static files (if any)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, ()=> console.log(`Auth server listening on http://localhost:${PORT}`));
