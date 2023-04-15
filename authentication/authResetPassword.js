import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA0EqZ46zM5rBzG6vTBgVoC0hBXEtyBylU",
    authDomain: "study-tracker-777c9.firebaseapp.com",
    databaseURL: "https://study-tracker-777c9-default-rtdb.firebaseio.com",
    projectId: "study-tracker-777c9",
    storageBucket: "study-tracker-777c9.appspot.com",
    messagingSenderId: "79203042938",
    appId: "1:79203042938:web:c21fb666ee2fb2fa2d1dc3",
    measurementId: "G-8BTPE7VHD9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const resetPasswordForm = document.getElementById('reset-password-form');

resetPasswordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email =
  document.getElementById('email').value;

  sendPasswordResetEmail(auth, email)
  .then(() => {

  alert("Password reset email sent successfully, check spam if you can't find it in your inbox")
  window.location.href = "/authentication/login.html";
  console.log('Password reset email sent successfully!');
  // Display success message to the user
  })
  .catch((error) => {
  console.error(error);
  alert(error);
  // Display error message to the user
  });
  });
  
  
  
  