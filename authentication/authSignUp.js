  // Import the functions you need from the SDKs you need


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, set, ref, get} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged}from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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
const database = getDatabase(app);
const auth = getAuth();



const signUp = document.getElementById('signUp');
signUp.addEventListener('click',(e) => {
e.preventDefault();
 var email = document.getElementById('email').value;
 var password = document.getElementById('password').value;
 var firstname = document.getElementById('firstname').value;
 var lastname = document.getElementById('lastname').value;


 
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const userRef = ref(database, 'users/' + user.uid);
    const userData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
    };

    set(userRef, userData)
      .then(() => {
        console.log('User data saved successfully:', userData);
        window.location.href = "/authentication/login.html";

      })
      .catch((error) => {
        console.error('Error saving user data:', error);
        alert('Error creating user!');
      });

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
})

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    console.log("User is signed in with UID:", uid);
  
    // ...
  } else {
    // User is signed out
    console.log("User is signed out");
    // ...
  }
});

