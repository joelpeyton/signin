// alerts
const verify = document.getElementById("verify");
const resend = document.getElementById("resend");
const unableToSendEmail = document.getElementById("unableToSendEmail");
const unableToCreateUser = document.getElementById("unableToCreateUser");
const incorrectDetails = document.getElementById("incorrectDetails");
const emailExists = document.getElementById("emailExists");

// forms
const forms = document.getElementById("forms");
const signinForm = document.getElementById("signinForm");
const registerForm = document.getElementById("registerForm");

// buttons and links
const signinBtn = document.getElementById("signinBtn");
const registerBtn = document.getElementById("registerBtn");
const cancelBtn = document.getElementById("cancelBtn");
const registerLink = document.getElementById("registerLink");
const showPassword = document.getElementById("showPassword");

// others
const heading = document.getElementById("heading");
const registerBox = document.getElementById("registerBox");

// helper functions
function renderSignin() {
    if (forms.style.display == "none") {
        forms.style.display = "block";
    }

    if (heading.style.display == "none") {
        heading.style.display = "block";
    }

    clearAlerts();
    clearSigninForm();

    signinForm.style.display = "block";
    registerForm.style.display = "none";
    registerBox.style.display = "block";
    heading.innerText = "Sign in to Acme";
    signinBtn.parentElement.classList.add("active");
    registerBtn.parentElement.classList.remove("active");
}

function renderRegister() {
    if (forms.style.display == "none") {
        forms.style.display = "block";
    }

    if (heading.style.display == "none") {
        heading.style.display = "block";
    }

    clearAlerts();
    clearRegisterForm();

    signinForm.style.display = "none";
    registerForm.style.display = "block";
    registerBox.style.display = "none";
    heading.innerText = "Create your account";
    signinBtn.parentElement.classList.remove("active");
    registerBtn.parentElement.classList.add("active");
}

function clearRegisterForm() {
    registerForm.firstName.value = "";
    registerForm.lastName.value = "";
    registerForm.email.value = "";
    registerForm.password.value = "";
}

function clearSigninForm() {
    signinForm.email.value = "";
    signinForm.password.value = "";
}

function clearAlerts() {
    const alertCollection = document.getElementsByClassName("alert");

    for (let i = 0; i < alertCollection.length; i++) {
        alertCollection[i].style.display = "none";
    }
}

// button events 
cancelBtn.onclick = function() {
    renderSignin();
}

registerBtn.onclick = function() {
    renderRegister();
}

registerLink.onclick = function() {
    renderRegister();
}

signinBtn.onclick = function() {
    renderSignin();
}

showPassword.onchange = function() {
    if (showPassword.checked) {
        document.getElementById("registerPassword").setAttribute("type", "text");
    } else {
        document.getElementById("registerPassword").setAttribute("type", "password");
    }
}

// register form event
registerForm.onsubmit = function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch("php/register.php", {
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
        clearAlerts();
        if (jsonResponse.emailExists) {
            emailExists.style.display = "block";
            heading.style.display = "none";
            forms.style.display = "none";
        } 
        else {
            if (jsonResponse.userCreated && jsonResponse.emailSent) {
                verify.style.display = "block";
                heading.style.display = "none";
                forms.style.display = "none";
            }
            else if (jsonResponse.userCreated && !jsonResponse.emailSent) {
                unableToSendEmail.style.display = "block";
                heading.style.display = "none";
                forms.style.display = "none";
            } 
            else if (!jsonResponse.userCreated) {
                unableToCreateUser.style.display = "block";
            } 
        } 
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
        window.location.href = "error.html";
    });
};

// sign in form event
signinForm.onsubmit = function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch("php/signin.php", {
        method: "post",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            window.location.href = "error.html";
        }
        return response.json();
    })
    .then(jsonResponse => {
        clearAlerts();
        if (jsonResponse.emailExists && jsonResponse.passwordVerified) {
            if (jsonResponse.emailVerified) {
                window.location.href = "loggedin.html";
            }
            else {
                resend.style.display = "block";
                clearSigninForm();
            }
        }
        else {
            incorrectDetails.style.display = "block";
            signinForm.password.value = "";
        }
    })
    .catch(error => {
        window.location.href = "error.html";
        console.error("There has been a problem with your fetch operation:", error);
    });
};