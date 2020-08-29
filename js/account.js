// form 
const updateForm = document.getElementById("accountForm");
const firstName = document.getElementById("accountFirstName");
const lastName = document.getElementById("accountLastName");
const email = document.getElementById("accountEmail");
const password = document.getElementById("newPassword");
const id = document.getElementById("id");

// buttons and links
const changePasswordBtn = document.getElementById("changePasswordBtn");
const signoutBtn = document.getElementById("signoutBtn");

// window onload event
// populate account form
window.onload = function() {
    clearAlerts();
    fetch("php/account.php")
    .then(response => {
        if (!response.ok) {
            window.location.href = "error.html";
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(jsonResponse => {
        firstName.value = jsonResponse.firstName;
        lastName.value = jsonResponse.lastName;
        email.value = jsonResponse.email;
        id.value = jsonResponse.userID;
        document.getElementById("accountName").innerText = jsonResponse.firstName;
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
        window.location.href = "error.html";
    });
}

// button events
changePasswordBtn.onclick = function() {
    const passwordCollection = document.getElementsByClassName("changePassword");

    for (let i = 0; i < passwordCollection.length; i++) {
        passwordCollection[i].style.display = "block";
    };

    changePasswordBtn.style.display = "none";
}

signoutBtn.onclick = function() {   
    fetch("php/signout.php")
    .then(response => {
        if (!response.ok) {
            window.location.href = "error.html";
            throw new Error("Network response was not ok");
        }
        firstName.value = "";
        lastName.value = "";
        email.value = "";
        id.value = "";
        password.value = "";
        document.getElementById("accountName").innerText = "";
        window.location.href = "index.html";
    })  
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
        window.location.href = "error.html";
    })
}


// update account form 
updateForm.onsubmit = function(event) {
    clearAlerts();
    event.preventDefault();

    const formData = new FormData(this);

    fetch("php/update.php", {
        method: "post",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            window.location.href = "error.html";
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(jsonResponse => {
        if (jsonResponse.emailExists) {
            document.getElementById("fail").style.display = "block";
        } 

        else {
            const changes = jsonResponse.changed;
            const user = jsonResponse.user;
            if (changes.length > 0) {
                document.getElementById("success").style.display = "block";
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
                        document.getElementById("accountName").innerText = user.firstName;
                    }
                }
                
            }
            else {
                document.getElementById("noUpdate").style.display = "block";
            }
        }
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
        window.location.href = "error.html";
    });
};

function clearAlerts() {
    const alertCollection = document.getElementsByClassName("alert");

    for (let i = 0; i < alertCollection.length; i++) {
        alertCollection[i].style.display = "none";
    }
}
