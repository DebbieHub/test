var selectedRow = null

function onFormSubmit(){
    if (Validite()) {

        var formData =readFormData();

        if (selectedRow = null) {
            insertNewRecord(formData);
        }
        else{
            updateRecord(formData);
        }
        resetForm();
    }

}

function readFormData(){
    var formData={};

    formData["userName"] = document.getElementById("userName").value;
    formData["rollNo"] = document.getElementById("rollNo").value;
    formData["stdClass"] = document.getElementById("stdClass").value;
    formData["age"] = document.getElementById("age").value;
    return formData;
}

function insertNewRecord(data){
    var table = document.getElementById(stdlist).getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.userName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.rollNo;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.stdClass;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.tsub;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.age;
    cell5 = nnewRow.insertCell(5);
    cell5.innerHTML = '<a onclick="onEdit(this)">Edit</a> <a onDelete(this)">Delete</a>';

}

function resetForm(){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("userName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("rollNo").value = selectedRow.cells[1].innerHTML;
    document.getElementById("stdClass").value = selectedRow.cells[2].innerHTML;
    document.getElementById("tsub").value = selectedRow.cells[3].innerHTML;
    document.getElementById("age").value = selectedRow.cells[4].innerHTML;

}

function up(formData) {
    selectedRow.cells[0].innerHTML = formData.userName;
    selectedRow.cells[1].innerHTML = formData.rollNo;
    selectedRow.cells[2].innerHTML = formData.stdClass;
    selectedRow.cells[3].innerHTML = formData.tsub;
    selectedRow.cells[4].innerHTML = formData.age;
}

function onDelete(td){
    if (confirm('Are you sure you want to delete this record?')) {
        row= td.parentElement.parentElement;
        document.getElementById("stdlist").deleteRow(row.rowIndex);
        resetForm();
    }
}

function vaidate() 
let isValid =true;
    // userName validation
    if(document.getElementById("userName").value ==""){
        isValid =false;
        document.getElementById("userNamevalidationError").classList.remove("hide");
    }
    else{
        isValid =true;
       if (!document.getElementById("userNamevalidationError").classlist.remove("hide"));
       {
        document.getElementById("userNamevalidationError").classList.add("hide");
       }
    }

    // Roll No Validation
    if (document.getElementById("userName").value ==""){
        isValid =false;
        document.getElementById("userNamevalidationError").classList.remove("hide");
    }
    else{
        isValid =true;
       if (!document.getElementById("userNamevalidationError").classlist.remove("hide"));
       {
        document.getElementById("userNamevalidationError").classList.add("hide");
       }

    //    Std class validation
       if (document.getElementById("userName").value ==""){
        isValid =false;
        document.getElementById("userNamevalidationError").classList.remove("hide");
    }
    else{
        isValid =true;
       if (!document.getElementById("userNamevalidationError").classlist.remove("hide"));
       {
        document.getElementById("userNamevalidationError").classList.add("hide");
       }
    }

    //    Tsub validation
       if (document.getElementById("userName").value ==""){
        isValid =false;
        document.getElementById("userNamevalidationError").classList.remove("hide");
    }
    else{
        isValid =true;
       if (!document.getElementById("userNamevalidationError").classlist.remove("hide"));
       {
        document.getElementById("userNamevalidationError").classList.add("hide");
       }
}

        // Age validation
if (document.getElementById("userName").value ==""){
    isValid =false;
    document.getElementById("userNamevalidationError").classList.remove("hide");
}
else{
    isValid =true;
   if (!document.getElementById("userNamevalidationError").classlist.remove("hide"));
   {
    document.getElementById("userNamevalidationError").classList.add("hide");
   }
}
return isValid
    }






















































