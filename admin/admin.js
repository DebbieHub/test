// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  push,
  ref,
  get,
  set,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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
    measurementId: "G-8BTPE7VHD9",
  };
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const usersRef = ref(database, "users");

const userBody = document.querySelector("#users-table tbody");
const recordBody = document.querySelector("#record-table tbody");

let idCounter = 1;
let recordId = 1;

onValue(usersRef, (snapshot) => {
  userBody.innerHTML = "";

  snapshot.forEach((childSnapshot) => {
    const userData = childSnapshot.val();

    const row = document.createElement("tr");
    const idCell = document.createElement("td");
    idCell.textContent = idCounter++;
    row.appendChild(idCell);

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = userData.firstname;
    row.appendChild(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = userData.lastname;
    row.appendChild(lastNameCell);

    const emailCell = document.createElement("td");
    emailCell.textContent = userData.email;
    row.appendChild(emailCell);

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete User";
    deleteButton.addEventListener("click", () => {
      remove(childSnapshot.ref);
    });
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    userBody.appendChild(row);
  });
});



onValue(usersRef, (snapshot) => {
    recordBody.innerHTML = "";
    idCounter = 1;  


    snapshot.forEach((childSnapshot) => {
      const userData = childSnapshot.val();
      const row = document.createElement("tr");
      
      const idCell = document.createElement("td");
    idCell.textContent = idCounter++;
    row.appendChild(idCell);
      // First name column
      const nameCell = document.createElement("td");
      nameCell.textContent = userData.firstname + " " + userData.lastname;
      row.appendChild(nameCell);

      // Score column
      const scoreCell = document.createElement("td");
      scoreCell.textContent = userData.averageScore;
      row.appendChild(scoreCell);
  
      // Attendance column
      const attendanceCell = document.createElement("td");
      attendanceCell.textContent = userData.percentage;
      row.appendChild(attendanceCell);
  
      // Grade column
      const gradeCell = document.createElement("td");
      gradeCell.textContent = userData.averageGrade;
      row.appendChild(gradeCell);
  
  
      recordBody.appendChild(row);
    });
  });
  