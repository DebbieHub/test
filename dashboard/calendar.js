import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  push,
  ref,
  get,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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

const attendanceBody = document.querySelector(".attendance-body");
const attendanceRate = document.querySelector(".attendance-rate");
attendanceRate.innerText = '0%';

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function generateCalendar(month, year) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
  
    let dayCount = 1;
  
    let calendarHTML = "<table><thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead><tbody>";

    // Add empty cells before first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarHTML += '<td class="disabled"></td>';
    }
    
    // Add calendar days
    for (let i = 1; i <= daysInMonth; i++) {
      let className = "calendar-day";
      if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        className += " today";
      }
      calendarHTML += `<td class="${className}" data-day="${i}">${i}</td>`;
    
      // Start a new row after the last day of the week
      if ((firstDay + i - 1) % 7 === 6) {
        calendarHTML += "</tr><tr>";
      }
    }
    
    // Add empty cells after last day of the month
    const lastDay = new Date(year, month, daysInMonth).getDay();
    for (let i = lastDay + 1; i < 7; i++) {
      calendarHTML += '<td class="disabled"></td>';
    }
    
    calendarHTML += "</tr></table>";
    
    const calendarBody = document.querySelector(".calendar-body");
    calendarBody.innerHTML = calendarHTML;
    
  
    // Add event listeners to calendar days
    const calendarDays = document.querySelectorAll(".calendar-day");
    calendarDays.forEach(day => {
      const dayNum = parseInt(day.dataset.day);
      const attendanceRef = ref(database, `attendance/${currentYear}/${currentMonth}/${dayNum}`);
      
      // Listen for changes to the attendance data in the database
      onValue(attendanceRef, (snapshot) => {
        const isPresent = snapshot.val();
        if (isPresent) {
          day.classList.add("present");
        } else {
          day.classList.remove("present");
        }
        
        // Update attendance rate
        const presentDays = document.querySelectorAll(".present").length;
        const totalDays = document.querySelectorAll(".calendar-day").length;
        const percentage = Math.round((presentDays / totalDays) * 100);
        attendanceRate.innerText = `${percentage}%`;
      });

      day.addEventListener("click", (event) => {
        const clickedDay = event.target;

        clickedDay.classList.toggle("present");
        clickedDay.classList.toggle("absent");

        const isPresent = clickedDay.classList.contains("present");
        set(attendanceRef, isPresent);

      });
    });
  }
  

function updateCalendar() {
  const calendarTitle = document.querySelector(".calendar-title");
  calendarTitle.innerText = `${months[currentMonth]} ${currentYear}`;

  generateCalendar(currentMonth, currentYear);
}

// Event listeners for prev/next buttons
const prevButton = document.querySelector(".btn-prev");
prevButton.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  updateCalendar();
});

const nextButton = document.querySelector(".btn-next");
nextButton.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateCalendar();
});


const calendarHeader = document.querySelector(".calendar-header");
calendarHeader.addEventListener("click", event => {
    if (event.target.classList.contains("btn-prev")) {
    currentMonth--;
    if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
    }
    updateCalendar();
    } else if (event.target.classList.contains("present")) {
    event.target.classList.remove("present");
    event.target.classList.add("absent");
    // Update attendance rate
const presentDays = document.querySelectorAll(".present").length;
const totalDays = daysInMonth;
const percentage = Math.round((presentDays / totalDays) * 100);
attendanceRate.innerText = `${percentage}%`;
} else if (event.target.classList.contains("absent")) {
    event.target.classList.remove("absent");
    event.target.classList.add("present");
    
// Update attendance rate
const presentDays = document.querySelectorAll(".present").length;
const numRows = Math.ceil((daysInMonth + firstDay) / 7);
const totalDays = numRows * 7;

const percentage = Math.round((presentDays / totalDays) * 100);
attendanceRate.innerText = `${percentage}%`;
}
generateCalendar(currentMonth, currentYear);
});

// Initial setup
updateCalendar(); 

let currentUser;
let daysInMonth;

onAuthStateChanged(auth, user => {
    if (user) {
      currentUser = user;
      // Reference the attendance node for the current user
      const attendanceRef = ref(database, `users/${currentUser.uid}/attendance`);
  
      // Listen for changes in the attendance node
      onValue(attendanceRef, snapshot => {
        // Update the UI with the attendance data
        const presentDays = Object.values(snapshot.val()).filter(day => day).length;
        const totalDays = document.querySelectorAll(".calendar-day").length;
        const percentage = Math.round((presentDays / totalDays) * 100);
        attendanceRate.innerText = `${percentage}%`;
       
      });
    } else {

currentUser = null;
}
});

// Event listener for calendar days
const calendarDays = document.querySelectorAll(".calendar-day");
calendarDays.forEach(day => {
day.addEventListener("click", (event) => {
  if (currentUser) {
    const clickedDay = event.target;         // get the clicked day using event.target
    const attendanceRef = ref(database, `users/${currentUser.uid}/attendance/${day.dataset.day}`);
    set(attendanceRef, clickedDay.classList.contains("present"));
  }
});
});
day.addEventListener("click", (event) => {
    const clickedDay = event.target;         // get the clicked day using event.target

    clickedDay.classList.toggle("present");
    clickedDay.classList.toggle("absent");
    const dayNum = parseInt(clickedDay.dataset.day);

    // Update attendance rate
    const presentDays = document.querySelectorAll(".present").length;
    const totalDays = daysInMonth;
    const percentage = Math.round((presentDays / totalDays) * 100);
    attendanceRate.innerText = `${percentage}%`;

    set(ref(database, `attendance/${currentYear}/${currentMonth}/${dayNum}`), clickedDay.classList.contains("present"));

  });
