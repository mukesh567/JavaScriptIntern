var selectedRow = null;

function showAlert(message, className) {

    const div = document.createElement("div");
    div.className = `alert alert-${className}`

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#add-contact-form");

    container.insertBefore(div, form);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}




//Clear All fields
function clearFields() {
    document.querySelector("#name").value = "";
    document.querySelector("#mobile").value = "";
}

//Add data
document.querySelector("#add-contact-form").addEventListener("submit", (e) => {
    e.preventDefault();

    //get form datas
    const name = document.querySelector("#name").value;
    const mobile = document.querySelector("#mobile").value;

    if (name == "" || mobile == "") {
        showAlert("Please fill in all fields", "danger");
    }

    else {
        if (selectedRow == null) {
            const list = document.querySelector("#contact-list");
            const row = document.createElement("tr");

            row.innerHTML = `
               <td> ${name}</td>
               <td>${mobile} </td>
               <td><button class="edit-btn edit">Edit</button> </td>
               <td><button class="delete-btn delete">Delete</button> </td>
            `;

            list.appendChild(row);
            selectedRow = null;
            showAlert("Contact has been added!", "success");
        }

        else {
            selectedRow.children[0].textContent = name;
            selectedRow.children[1].textContent = mobile;
            selectedRow = null;
            showAlert("Contact Info Edited!", "info");
        }

        clearFields();
    }
})

//Edit data
document.querySelector("#contact-list").addEventListener("click", (e) => {
    target = e.target;

    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#name").value = selectedRow.children[0].textContent;
        document.querySelector("#mobile").value = selectedRow.children[1].textContent;
    }
})

//Delete data
document.querySelector("#contact-list").addEventListener("click", (e) => {
    target = e.target;

    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Data has been deleted!", "danger");
    }
})

//Search or Filter by name
const searchByName = () => {
    let filter = document.getElementById('filter-name').value.toUpperCase();
    let myTable = document.getElementById('my-table');
    let tr = myTable.getElementsByTagName('tr');

    for (var i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[0];

        if (td) {
            let textValue = td.textContent || innerHTML;

            if (textValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


//Search by mobile
const searchByMobile = () => {
    let filter = document.getElementById('filter-mobile').value;
    let myTable = document.getElementById('my-table');
    let tr = myTable.getElementsByTagName('tr');

    for (var i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[1];

        if (td) {
            let textValue = td.textContent || innerHTML;

            if (textValue.indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


