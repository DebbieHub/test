

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged }from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
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
const auth = getAuth(app);

const loginButton = document.getElementById('login-btn');

loginButton.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Logged in successfully
      const user = userCredential.user;
      if (user.email === 'admin@estudytracker.com') {
       window.location.href = "/admin/admin.html";
      } else {

      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error ${errorCode}: ${errorMessage}`);
    });
});

onAuthStateChanged(auth, (user) => {
  if (user && user.email === 'admin@studytracker.com') {
     window.location.href = "/admin/admin.html";
  } else {
  }
});
