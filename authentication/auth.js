window.addEventListener('DOMContentLoaded', () => {
const firebaseConfig = {
    apiKey: "AIzaSyC-Al9M2SdzD7ErNQRJt0C7nU0LN4MtskE",
    authDomain: "study-tracker-c5317.firebaseapp.com",
    projectId: "study-tracker-c5317",
    storageBucket: "study-tracker-c5317.appspot.com",
    messagingSenderId: "919639315385",
    appId: "1:919639315385:web:bf27f9f1ddd1441a27dc68",
    measurementId: "G-ZFKWZNH1YM"
  };
    firebase.initializeApp(firebaseConfig);


    const auth = firebase.auth();
    

// Sign up function
const signUp = (email, password, firstname, lastname) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  

// Login function
const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

// Listen for changes in authentication state
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    window.location.href = "/dashboard/dashboard.html";
    console.log("User signed in:", user.email);
  } else {
    // User is signed out
    console.log("User signed out");
  }
});

// Get references to the registration and login forms
const registerForm = document.querySelector('#register-form');
const loginForm = document.querySelector('#login-form');

// Handle registration form submit

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = registerForm['email'].value;
    const password = registerForm['password'].value;
    const firstName = registerForm['fname'].value;
    const lastName = registerForm['lname'].value;
  
    if (email.trim() === "" || password.trim() === "" || firstName.trim() === "" || lastName.trim() === "") {
      alert("Please fill in all fields.");
    } else {
      signUp(email, password, firstName, lastName)
        .then((userCredential) => {
          // Signed up successfully
          const user = userCredential.user;
          window.location.href = "/authentication/login.html";
          console.log("User signed up:", user.email);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/email-already-in-use') {
            alert('The email address is already in use.');
          } else if (errorCode === 'auth/invalid-email') {
            alert('The email address is not valid.');
          } else if (errorCode === 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
        });
    }
  });
  
  // Handle login form submit
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;
  
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields.");
    } else {
      login(email, password)
        .then((userCredential) => {
          // User login successful
          const user = userCredential.user;
          if (user.emailVerified) {
            console.log("User logged in:", user.email);
            window.location.href = "/dashboard/dashboard.html";
          } else {
            alert('Please verify your email address before logging in.');
            return Promise.reject();
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
            alert('Invalid email address or password.');
          } else if (errorCode === 'auth/invalid-email') {
            alert('Invalid email address.');
          } else if (errorCode === 'auth/user-disabled') {
            alert('This user account has been disabled.');
          } else {
            alert(errorMessage);
          }
        });
    }
  });
  
  // Handle logout button click
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
logoutButton.addEventListener('click', (event) => {
event.preventDefault();
auth.signOut().then(() => {
console.log("User signed out");
window.location.href = "/index.html";
});
});
} else {
console.log("Logout button not found.");
}
  
});

