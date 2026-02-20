const toggleBtn = document.querySelector(".theme-toggle");
const icon = document.getElementById("themeIcon");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
});

const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("error");
const googleBtn = document.getElementById('googleBtn');

if (form){
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            errorMsg.style.color = "red";
            errorMsg.innerText = "Please enter email and password";
            return;
        }

        errorMsg.style.color = "black";
        errorMsg.innerText = "Checking credentials...";

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            // Backend reached but credentials wrong
            if (response.status === 401) {
                errorMsg.style.color = "red";
                errorMsg.innerText = "Invalid email or password";
                return;
            }

            // Other backend errors
            if (!response.ok) {
                errorMsg.style.color = "red";
                errorMsg.innerText = "Something went wrong. Try again.";
                return;
            }

            const data = await response.json();

            // Login success
            errorMsg.style.color = "green";
            errorMsg.innerText = "Login successful! Redirecting...";

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1200);

        } catch (error) {
            // Backend not reachable
            errorMsg.style.color = "red";
            errorMsg.innerText = "Server not available. Please try later.";
        }
    });
}

// Open backend OAuth endpoint in centered popup and listen for token via postMessage
function openAuthPopup(url, name='oauth', w=520, h=600){
    const left = Math.round((window.screen.width - w) / 2);
    const top = Math.round((window.screen.height - h) / 2);
    return window.open(url, name, `width=${w},height=${h},left=${left},top=${top}`);
}

if (googleBtn){
    googleBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        // Open your backend OAuth start endpoint
        const popup = openAuthPopup('http://localhost:3000/auth/google', 'googleAuth', 520, 600);

        function receiveMessage(ev){
            if (!ev.data || !ev.data.token) return;
            const token = ev.data.token;
            // store token and proceed (adjust to your auth strategy)
            localStorage.setItem('authToken', token);
            window.removeEventListener('message', receiveMessage);
            try{ popup.close(); }catch(e){}
            // redirect to dashboard or reload
            window.location.href = 'dashboard.html';
        }

        window.addEventListener('message', receiveMessage, false);
    });
}
