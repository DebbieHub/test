
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
  const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

auth.onAuthStateChanged(() => {
    const user = auth.currentUser;
  if (user) {
    const userRef = ref(database, 'users/' + user.uid);
    get(userRef).then((snapshot) => {
      const userData = snapshot.val();
      const firstName = userData.firstname;
      // Modify the welcome message with the user's first name
      document.getElementById('welcome-message').innerHTML = "Welcome, " + firstName + "!";
    }).catch((error) => {
      console.error('Error retrieving user data:', error);
    });
  } else {
    // User is not authenticated, update UI accordingly
    document.getElementById('welcome-message').innerHTML = "Welcome!";
  }
});

