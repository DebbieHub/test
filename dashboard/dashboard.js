// Import the functions you need from the SDKs you need

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

auth.onAuthStateChanged(() => {
  const user = auth.currentUser;
  if (user) {
    const userRef = ref(database, "users/" + user.uid);
    get(userRef).then((snapshot) => {
      const userData = snapshot.val();
      const firstName = userData.firstname;
      document.getElementById("welcome-message").innerHTML =
        "WELCOME, " + firstName + "!";
    });
  }

  if (user) {
    const userRef = ref(database, "users/" + user.uid + "/grade");
    get(userRef)
      .then((snapshot) => {
        const entries = snapshot.val();
        if (!entries) return;

        let totalScore = 0;
        let numScores = 0;
        Object.entries(entries).forEach(([entryKey, entryValue]) => {
          const { classGrade, termGrade, subjectGrade, scoreGrade, grade } =
            entryValue;

          const newRow = document.createElement("tr");
          const newClassGrade = document.createElement("td");
          newClassGrade.appendChild(document.createTextNode(classGrade));

          const newTermGrade = document.createElement("td");
          newTermGrade.appendChild(document.createTextNode(termGrade));

          const newSubjectGrade = document.createElement("td");
          newSubjectGrade.appendChild(document.createTextNode(subjectGrade));

          const newScoreGrade = document.createElement("td");
          newScoreGrade.appendChild(document.createTextNode(scoreGrade));

          const newGrade = document.createElement("td");
          newGrade.appendChild(document.createTextNode(grade));

          const newAction = document.createElement("td");
          newAction.style.display = "flex";
          newAction.style.flexDirection = "column";
          newAction.style.gap = "20px";
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.style.backgroundColor = "red";
          deleteButton.style.color = "white";
          deleteButton.style.border = "none";
          deleteButton.style.padding = "10px";
          deleteButton.style.fontSize = "13px";
          deleteButton.addEventListener("click", function () {
            newRow.remove();
            const entryRef = ref(
              database,
              `users/${user.uid}/grade/${entryKey}`
            );
            set(entryRef, null);
          });

          newRow.appendChild(newClassGrade);
          newRow.appendChild(newTermGrade);
          newRow.appendChild(newSubjectGrade);
          newRow.appendChild(newScoreGrade);
          newRow.appendChild(newGrade);
          newAction.appendChild(deleteButton);

          newRow.appendChild(newAction);
          document.getElementById("gradeTable").appendChild(newRow);
          totalScore += parseFloat(scoreGrade); // add grade to total
          numScores++; 
        });

   
        const averageScore = totalScore / numScores; // calculate average score
        document.getElementById("averageScore").textContent = averageScore.toFixed(2)+"%";

        const scoreRef = ref(database, "users/" + user.uid + "/averageScore");
        set(scoreRef, averageScore)
          .then(() => {
            console.log("Average score saved to database");
          })
          .catch((error) => {
            console.error("Error saving average score to database:", error);
          });
        let grade;

        switch (true) {
          case averageScore >= 70:
            grade = "A";
            break;
          case averageScore >= 60 && averageScore < 70:
            grade = "B";
            break;
          case averageScore >= 50 && averageScore < 60:
            grade = "C";
            break;
          case averageScore >=40 && averageScore < 50:
            grade = "D";
            break;
          case averageScore >=30 && averageScore < 40:
            grade = "E";
            break;
          default: 
          grade = "F";
        }
        document.getElementById("averageGrade").textContent = grade;

        const userRef = ref(database, "users/" + user.uid + "/averageGrade");
        set(userRef, grade)
          .then(() => {
            console.log("Average grade saved to database");
          })
          .catch((error) => {
            console.error("Error saving average grade to database:", error);
          });
        
  
      })
      .catch((error) => {
        console.error("Error retrieving user data:", error);
      });
  } else {
    // User is not authenticated, update UI accordingly
    document.getElementById("welcome-message").innerHTML = "WELCOME";
  }
  if (user) {
    const userRef = ref(database, "users/" + user.uid + "/schedule");
    get(userRef)
      .then((snapshot) => {
        const entries = snapshot.val();
        if (!entries) return; // return if no entries found


        Object.entries(entries).forEach(([entryKey, entryValue]) => {
          // retrieve the data for each entry
          const { activity, subject, date, time } = entryValue;
          // create a new row in the table with the retrieved data
          const newRow = document.createElement("tr");
          const newActivity = document.createElement("td");
          newActivity.appendChild(document.createTextNode(activity));
          const newSubject = document.createElement("td");
          newSubject.appendChild(document.createTextNode(subject));
          const newDate = document.createElement("td");
          newDate.appendChild(document.createTextNode(date));
          const newTime = document.createElement("td");
          newTime.appendChild(document.createTextNode(time));
          const newAction = document.createElement("td");
          newAction.style.display = "flex";
          newAction.style.flexDirection = "column";
          newAction.style.gap = "20px";
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.style.backgroundColor = "red";
          deleteButton.style.color = "white";
          deleteButton.style.border = "none";
          deleteButton.style.padding = "10px";
          deleteButton.style.fontSize = "13px";
          deleteButton.addEventListener("click", function () {
            newRow.remove();
            // remove the entry from the database
            const entryRef = ref(
              database,
              `users/${user.uid}/schedule/${entryKey}`
            );
            set(entryRef, null);
          });

          newAction.appendChild(deleteButton);
          newRow.appendChild(newActivity);
          newRow.appendChild(newSubject);
          newRow.appendChild(newDate);
          newRow.appendChild(newTime);
          newRow.appendChild(newAction);
          document.getElementById("schTable").appendChild(newRow);


        });


      })
      .catch((error) => {
        console.error("Error retrieving user data:", error);
      });
  } else {
    // User is not authenticated, update UI accordingly
    document.getElementById("welcome-message").innerHTML = "WELCOME";
  }

  if (user) {
    const userRef = ref(database, "users/" + user.uid + "/schedule");
    onValue(userRef, (snapshot) => {
      const entries = snapshot.val();
      if (!entries) return; // return if no entries found
  
      // Retrieve all tasks and sort by date, earliest to latest
      const tasks = Object.entries(entries).map(([entryKey, entryValue]) => {
        return {
          key: entryKey,
          ...entryValue,
        };
      });
      tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
  
      // Take the first four tasks (latest) and add to the "upcoming tasks" table
      const upcomingTasksTable = document.getElementById("upcoming-tasks");
      upcomingTasksTable.innerHTML = "";
      tasks.slice(0, 4).forEach((task) => {
        const newRow = document.createElement("tr");
        const newTask = document.createElement("td");
        newTask.appendChild(document.createTextNode(task.activity));
        const newSubject = document.createElement("td");
        newSubject.appendChild(document.createTextNode(task.subject));
        const newDate = document.createElement("td");
        newDate.appendChild(document.createTextNode(task.date));
        const newTime = document.createElement("td");
        newTime.appendChild(document.createTextNode(task.time));
        newRow.appendChild(newTask);
        newRow.appendChild(newSubject);
        newRow.appendChild(newDate);
        newRow.appendChild(newTime);
        upcomingTasksTable.appendChild(newRow);
      });
    });
  }
  
});

// for modal form pop up
// Get the modal
var modal = document.getElementById("modal");
// Get the button that opens the modal
var btns = document.querySelectorAll(".create--action");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    modal.style.display = "block";
  });
});

// When the user submits the form, close the modal
var formModal = document.querySelector("form");

formModal.addEventListener("submit", function (e) {
  e.preventDefault();
  modal.style.display = "none";
});

// When the user clicks on <span> (x), close the modal
span.addEventListener("click", function () {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
// When the user clicks on the button, open the modal and set the activity value
btns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    modal.style.display = "block";
    var activity = "";
    if (btn.classList.contains("red")) {
      activity = "Study Time";
    } else if (btn.classList.contains("green")) {
      activity = "Assignment";
    } else if (btn.classList.contains("yellow")) {
      activity = "Exam";
    }
    document.getElementById("activity").value = activity;
  });
});

//garde form and table
var modalGrade = document.getElementById("modalGrade");
var btnGrade = document.querySelectorAll(".grade--action");
var closeGrade = document.getElementsByClassName("closeGrade")[0];

btnGrade.forEach(function (btn) {
  btn.addEventListener("click", function () {
    modalGrade.style.display = "block";
  });
});

var GradeModal = document.querySelector("#gradeForm");

GradeModal.addEventListener("submit", function (e) {
  e.preventDefault();
  modalGrade.style.display = "none";
});
closeGrade.addEventListener("click", function () {
  modalGrade.style.display = "none";
});
window.addEventListener("click", function (event) {
  if (event.target == modalGrade) {
    modalGrade.style.display = "none";
  }
});

//adding form to grade
const classGrade = document.getElementById("class");
const termGrade = document.getElementById("term");
const subjectGrade = document.getElementById("gradeSubject");
const scoreGrade = document.getElementById("score");
const grade = document.getElementById("grade");
const formGrade = document.getElementById("gradeForm");
const tableGrade = document
  .getElementById("gradeTable")
  .getElementsByTagName("tbody")[0];
const submitGrade = document.getElementById("grade-submit");

formGrade.addEventListener("submit", function (event) {
  event.preventDefault();
  let classGradeValue = classGrade.value;
  let termGradeValue = termGrade.value;
  let subjectGradeValue = subjectGrade.value;
  let scoreGradeValue = scoreGrade.value;
  let gradeValue = grade.value;

  const newRow = document.createElement("tr");

  const newClassGrade = document.createElement("td");
  newClassGrade.appendChild(document.createTextNode(classGradeValue));

  const newTermGrade = document.createElement("td");
  newTermGrade.appendChild(document.createTextNode(termGradeValue));
  const newSubjectGrade = document.createElement("td");
  newSubjectGrade.appendChild(document.createTextNode(subjectGradeValue));

  const newScoreGrade = document.createElement("td");
  newScoreGrade.appendChild(document.createTextNode(scoreGradeValue));

  const newGrade = document.createElement("td");
  newGrade.appendChild(document.createTextNode(gradeValue));

  const newAction = document.createElement("td");
  newAction.style.display = "flex";
  newAction.style.flexDirection = "column";
  newAction.style.gap = "20px";
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.backgroundColor = "red";
  deleteButton.style.color = "white";
  deleteButton.style.border = "none";
  deleteButton.style.padding = "10px";
  deleteButton.style.fontSize = "13px";
  deleteButton.style.cursor = "pointer";

  deleteButton.addEventListener("click", function () {
    newRow.remove();
  });
  newRow.appendChild(newClassGrade);
  newRow.appendChild(newTermGrade);
  newRow.appendChild(newSubjectGrade);
  newRow.appendChild(newScoreGrade);
  newRow.appendChild(newGrade);
  newRow.appendChild(newAction);
  newAction.appendChild(deleteButton);
  tableGrade.appendChild(newRow);

  const user = auth.currentUser;
  if (user) {
    const userRef = ref(database, "users/" + user.uid + "/grade");
    push(userRef, {
      classGrade: classGradeValue,
      termGrade: termGradeValue,
      subjectGrade: subjectGradeValue,
      scoreGrade: scoreGradeValue,
      grade: gradeValue,
    })
      .then(() => {
        console.log("Data saved successfully.");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  } else {
    console.log("User not authenticated.");
  }

  subjectGrade.value = "";
  scoreGrade.value = "";
  grade.value = "";
});

//adding form to schedule
const activity = document.getElementById("activity");
const subject = document.getElementById("subject");
const date = document.getElementById("date");
const time = document.getElementById("time");
const form = document.getElementById("schForm");
const tableNew = document
  .getElementById("schTable")
  .getElementsByTagName("tbody")[0];
const submitButton = document.getElementById("btn-submit");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let activityValue = activity.value;
  let subjectValue = subject.value;
  let dateValue = date.value;
  let timeValue = time.value;

  const newRow = document.createElement("tr");
  const newActivity = document.createElement("td");
  newActivity.appendChild(document.createTextNode(activityValue));

  const newSubject = document.createElement("td");
  newSubject.appendChild(document.createTextNode(subjectValue));

  const newDate = document.createElement("td");
  newDate.appendChild(document.createTextNode(dateValue));

  const newTime = document.createElement("td");
  newTime.appendChild(document.createTextNode(timeValue));

  const newAction = document.createElement("td");
  newAction.style.display = "flex";
  newAction.style.flexDirection = "column";
  newAction.style.gap = "20px";
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.backgroundColor = "red";
  deleteButton.style.color = "white";
  deleteButton.style.border = "none";
  deleteButton.style.padding = "10px";
  deleteButton.style.fontSize = "13px";
  deleteButton.style.cursor = "pointer";

  deleteButton.addEventListener("click", function () {
    newRow.remove();
  });

  newRow.appendChild(newActivity);
  newRow.appendChild(newSubject);
  newRow.appendChild(newDate);
  newRow.appendChild(newTime);
  newRow.appendChild(newAction);
  newAction.appendChild(deleteButton);
  tableNew.appendChild(newRow);

  const user = auth.currentUser;
  if (user) {
    const userRef = ref(database, "users/" + user.uid + "/schedule");
    push(userRef, {
      activity: activityValue,
      subject: subjectValue,
      date: dateValue,
      time: timeValue,
    })
      .then(() => {
        console.log("Data saved successfully.");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  } else {
    console.log("User not authenticated.");
  }

  activity.value = "";
  subject.value = "";
  date.value = "";
  time.value = "";
});

// get the table and rows
const scheduleTable = document.querySelector("schTable");
const scheduleRows = scheduleTable.querySelectorAll("tbody tr");

// create an array to store the tasks
const tasks = [];

// loop through the rows to get the tasks
for (let i = 0; i < scheduleRows.length; i++) {
  const row = scheduleRows[i];
  const task = {
    activity: row.cells[0].textContent,
    subject: row.cells[1].textContent,
    date: new Date(row.cells[2].textContent + " " + new Date().getFullYear()),
    time: row.cells[3].textContent,
  };
  tasks.push(task);
}

// sort the tasks by date
tasks.sort((a, b) => a.date - b.date);

// get the four latest tasks
const upcomingTasks = tasks.slice(0, 4);

// get the table body for the upcoming tasks
const upcomingTable = document.querySelector("#upcoming-tasks tbody");

// clear the table body
upcomingTable.innerHTML = "";

// loop through the upcoming tasks and add them to the table
for (let i = 0; i < upcomingTasks.length; i++) {
  const task = upcomingTasks[i];
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${task.activity}</td>
    <td>${task.subject}</td>
    <td>${task.date.toLocaleDateString()}</td>
    <td>${task.time}</td>
  `;
  upcomingTable.appendChild(row);
}


const nextButton = document.querySelector(".btn-next");
nextButton.addEventListener("click", () => {
currentMonth++;
if (currentMonth > 11) {
currentMonth = 0;
currentYear++;
}
updateCalendar();
});

updateCalendar();



