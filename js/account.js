import { clearAlerts, showPassword } from "./utils.js";

// form 
const updateForm = document.getElementById("accountForm");
const firstName = document.getElementById("accountFirstName");
const lastName = document.getElementById("accountLastName");
const email = document.getElementById("accountEmail");
const password = document.getElementById("newPassword");
const id = document.getElementById("id");
const accountName = document.querySelector("#accountName");
const show = document.querySelector("#showPasswordDiv");
show.style.display = "none";

// buttons and links
const changePasswordBtn = document.getElementById("changePasswordBtn");
const signoutBtn = document.getElementById("signoutBtn");
const deleteBtn = document.querySelector("#deleteBtn");

// window onload event
// populate account form
window.onload = function() {
    clearAlerts();
    showPassword();
    
    fetch("php/account.php")
    .then(response => {
        if (!response.ok) {
            let error = response.status + ":" + response.statusText; 
            throw new Error(error);
        }
        return response.json();
    })
    .then(jsonResponse => {

        // populate form fields
        firstName.value = jsonResponse.firstName;
        lastName.value = jsonResponse.lastName;
        email.value = jsonResponse.email;
        id.value = jsonResponse.userID;
        accountName.innerText = jsonResponse.firstName;

    })
    .catch(error => {
        let url = "error.html?error=" + error;
        window.location.href = url;
    });
};

// button events
changePasswordBtn.onclick = function() {
    show.style.display = "block";
    const passwordCollection = document.getElementsByClassName("changePassword");

    for (let i = 0; i < passwordCollection.length; i++) {
        passwordCollection[i].style.display = "block";
    }

    changePasswordBtn.style.display = "none";
};

signoutBtn.onclick = function() {   
    fetch("php/signout.php")
    .then(response => {
        if (!response.ok) {
            let error = response.status + ":" + response.statusText; 
            throw new Error(error);
        }

        sessionStorage.setItem("loggedIn", "false");
        // clear form details on signout
        firstName.value = "";
        lastName.value = "";
        email.value = "";
        id.value = "";
        password.value = "";
        accountName.innerText = "";
        window.location.href = "index.html";

    })  
    .catch(error => {
        let url = "error.html?error=" + error;
        window.location.href = url;
    });
};

deleteBtn.onclick = function() {

    if (sessionStorage.getItem("loggedIn") == "true") {
        fetch("php/delete.php?id=" + id.value)
        .then(response => {
            if (!response.ok) {
                let error = response.status + ":" + response.statusText; 
                throw new Error(error);
            }
            return response.json();
        })
        .then(jsonResponse => {
            
            const deleteAlert = document.querySelector("#deleted");

            if (deleteAlert.classList.contains("alert.success")) {
                deleteAlert.classList.remove("alert-success");
            }


            if (deleteAlert.classList.contains("alert.danger")) {
                deleteAlert.classList.remove("alert-danger");
            }

            // no user found
            if (jsonResponse.userExists === false) {
                deleteAlert.innerText = "No user found. Please contact customer support.";
                deleteAlert.classList.add("alert-danger");
            }

            // user found
            else {

                // delete success
                if (jsonResponse.deleted === true) {
                    sessionStorage.setItem("loggedIn", "false");
                    window.location.href= "index.html";
                }

                // delete fail
                else {
                    deleteAlert.innerText = "Unable to delete your account. Please contact customer support.";
                    deleteAlert.classList.add("alert-danger");
                }
            }
        })
        .catch(error => {
            let url = "error.html?error=" + error;
            window.location.href = url;
        });
    }

    else {
        window.location.href = "index.html";
    }
};

// update account form 
updateForm.onsubmit = function(event) {
    clearAlerts();
    event.preventDefault();

    const formData = new FormData(this);

    if (sessionStorage.getItem("loggedIn") == "true") {
        fetch("php/update.php", {
            method: "post",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                let error = response.status + ":" + response.statusText; 
                throw new Error(error);
            }
            return response.json();
        })
        .then(jsonResponse => {
            const fail = document.querySelector("#fail");
    
            // email already taken
            if (jsonResponse.emailExists) {
                fail.style.display = "block";
            } 
    
            else {
                const changes = jsonResponse.changed;
                const user = jsonResponse.user;
    
                // if changes to deatils
                if (changes.length > 0) {
                    const success = document.querySelector("#success");
                    success.style.display = "block";
                    const updatedFields = document.getElementById("updatedFields");
                    const listItemCollection = updatedFields.children;
                    
                    for (let i = listItemCollection.length - 1; i >= 0; i--) {
                        listItemCollection[i].remove();
                    }
        
                    for (let i = 0; i < changes.length; i++) {
                        let listItem = document.createElement("li");
                        listItem.innerText = changes[i];
                        updatedFields.appendChild(listItem);
        
                        if (changes[i] == "First Name") {
                            accountName.innerText = user.firstName;
                        }
                    }
                    
                }
                else {
                    const noUpdate = document.querySelector("#noUpdate");
                    noUpdate.style.display = "block";
                }
            }
        })
        .catch(error => {
            let url = "error.html?error=" + error;
            window.location.href = url;
        });
    }

    else {
        window.location.href = "index.html";
    }
};

