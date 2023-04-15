  // Import the functions you need from the SDKs you need


  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
  import { getAuth, signOut  }from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  
  
  
//Logout auth
const logoutButton = document.getElementById('logout-btn');
logoutButton.addEventListener('click',(e) => {
    e.preventDefault();
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = "/authentication/login.html";

      }).catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
})