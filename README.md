## 🚀 Features

---

- Clean and modern UI
- Input validation with error messages
- Auto-formatting & capitalization
- Download as PDF
- Download as DOCX
- Reset functionality
- Responsive layout

## 🛠️ Technologies Used

---
- HTML5  
- CSS3  
- JavaScript (Vanilla JS)  
- html2pdf.js – For PDF export  
- docx.js – For DOCX generation  

## 📂 Project Structure

```
Cover-Letter-Generator/
│
├── login.html        # Login page
├── login.css         # Login styling
├── login.js          # Login logic
├── CV.html           # Cover letter page
├── CV.css            # Styling file
├── CV.js             # Application logic
└── README.md
```
## 📌 How It Works

1. User opens the Login page.  
2. User enters:
   - Email  
   - Password  

3. The application validates the login credentials.  
4. After successful login, the user is redirected to the Cover Letter Generator page.  
5. User fills in the required cover letter details.  
6. Clicks on the **Generate** button.  
7. A formatted cover letter is created instantly.  
8. The user can download the letter as PDF or DOCX.  

 Process:
   - The system checks whether the email and password fields are filled.
   - If the details are valid, the user is redirected to the Cover Letter Generator page.
   - If not, an error message is displayed.
---

## 💻 How to Run Locally

Clone or download this repository:

```
git clone https://github.com/your-username/cover-letter-generator.git
```

Open the project folder.

Run `login.html` in your browser  
OR open it using Live Server in VS Code.

No backend or installation is required. The project runs completely on the client side.

---

## 🌟 Future Improvements

- Secure authentication system  
- AI-based personalized content  
- Multiple cover letter templates  
- Backend integration  
- Cloud storage support  
