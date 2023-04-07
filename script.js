const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const fullName = firstName + lastName;
const rollNo = document.getElementById("rollNo");
const stdClass = document.getElementById("stdClass");
const totalSubjects = document.getElementById("tsub");
const age = document.getElementById("age");
const form = document.getElementById("myForm");
const tableNew = document.getElementById("myTable").getElementsByTagName('tbody')[0];
const submitButton = document.getElementById("btn-submit");
//validation
const fnValidation = document.getElementById("fnValid");
const lnValidation = document.getElementById("lnValid");
const rollNoValidation = document.getElementById("rollNoValid");
const scValidation = document.getElementById("scValid");
const tsValidation = document.getElementById("tsValid");
const ageValidation = document.getElementById("ageValid");

//form functions
form.addEventListener('submit', function(event){
    event.preventDefault();
    fnValidation.innerHTML = "";
lnValidation.innerHTML = "";
rollNoValidation.innerHTML = "";
scValidation.innerHTML = "";
tsValidation.innerHTML = "";
ageValidation.innerHTML = "";

    let nameValue = firstName.value + " " + lastName.value;
    let rollNoValue = rollNo.value;
    let stdClassValue = stdClass.value;
    let totalSubValue = totalSubjects.value;
    let ageValue = age.value;

    let isValid = true;

    switch(true) {
        case firstName.value.trim() === "":
            fnValidation.innerHTML = "Please enter your first name";
        isValid = false;
        break;
        case lastName.value.trim() === "":
            lnValidation.innerHTML = "Please enter your last name";
        isValid = false;
        break;
        case rollNo.value.trim() === "":
            rollNoValidation.innerHTML = "Please enter your roll number";
        isValid = false;
        break;
        case stdClass.value.trim() === "":
            scValidation.innerHTML = "Please enter your class";
        isValid = false;
        break;
        case totalSubjects.value.trim() === "":
            tsValidation.innerHTML = "Please enter your total subjects";
        isValid = false;
        break;
        case age.value.trim() === "":
            ageValidation.innerHTML = "Please enter your age";
        isValid = false;
        break;

        default: 
        isValid = true;
        break;
    }
  //check if the form is empty 
  if(!isValid) {
    return false;
  }
    const isEditMode = form.hasAttribute('data-edit-mode');

    // If the form is in edit mode, get the currently selected row
    let selectedRow = null;
    if (isEditMode) {
        selectedRow = form.getAttribute('data-edit-mode');
    }


    if (selectedRow !== null) {
        const selectedCells = tableNew.rows[selectedRow].cells;
        selectedCells[0].textContent = nameValue;
        selectedCells[1].textContent = rollNoValue;
        selectedCells[2].textContent = stdClassValue;
        selectedCells[3].textContent = totalSubValue;
        selectedCells[4].textContent = ageValue;

        // Remove the edit mode attribute from the form
        form.removeAttribute('data-edit-mode');

        submitButton.textContent = "Save";

    } else {
    const newRoll = document.createElement("tr");

    //create a new cell for name
    const newName = document.createElement("td");
    newName.appendChild(document.createTextNode(nameValue));

    const newRollNo = document.createElement("td");
    newRollNo.appendChild(document.createTextNode(rollNoValue));

    const newStdClass = document.createElement("td");
    newStdClass.appendChild(document.createTextNode(stdClassValue));

    const newTotalSub = document.createElement("td");
    newTotalSub.appendChild(document.createTextNode(totalSubValue));

    const newAge = document.createElement("td");
    newAge.appendChild(document.createTextNode(ageValue));

    const newAction = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        newRoll.remove();
    })
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function(){
       const nameCell = newName.textContent;
       const rollNoCell = newRollNo.textContent;
       const stdClassCell = newStdClass.textContent;
       const totalSubCell = newTotalSub.textContent;
       const ageCell = newAge.textContent;

       fullName.value = nameCell;
       rollNo.value = rollNoCell;
       stdClass.value = stdClassCell;
       totalSubjects.value = totalSubCell;
       age.value = ageCell;
        
       submitButton.textContent = "Save";
       form.setAttribute('data-edit-mode', newRoll.rowIndex - 1);
})
       
    newRoll.appendChild(newName);
    newRoll.appendChild(newRollNo);
    newRoll.appendChild(newStdClass);
    newRoll.appendChild(newTotalSub);
    newRoll.appendChild(newAge);
    newRoll.appendChild(newAction);
    newAction.appendChild(deleteButton);
    newAction.appendChild(editButton);
    tableNew.appendChild(newRoll);
    }
    //reset form after submitting
    firstName.value = '';
    lastName.value = '';
    rollNo.value = '';
    stdClass.value = '';
    totalSubjects.value = '';
    age.value = '';

})




//HomePage

















































