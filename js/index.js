import { clearAlerts, showPassword } from "./utils.js";

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
const forgottenForm = document.getElementById("forgotten");


// buttons and links
const signinBtn = document.getElementById("signinBtn");
const registerBtn = document.getElementById("registerBtn");
const cancelBtn = document.getElementById("cancelBtn");
const registerLink = document.getElementById("registerLink");
const forgottenLink = document.getElementById("forgottenLink");

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
    forgottenForm.style.display = "none";
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
    forgottenForm.style.display = "none";
    heading.innerText = "Create your account";
    signinBtn.parentElement.classList.remove("active");
    registerBtn.parentElement.classList.add("active");
}

function renderForgotten() {
    if (forms.style.display == "none") {
        forms.style.display = "block";
    }

    if (heading.style.display == "none") {
        heading.style.display = "block";
    }

    clearAlerts();

    signinForm.style.display = "none";
    registerForm.style.display = "none";
    registerBox.style.display = "none";
    forgottenForm.style.display = "block";
    heading.innerText = "Reset your password";
    signinBtn.parentElement.classList.remove("active");
    registerBtn.parentElement.classList.remove("active");
    document.querySelector("#forgottenEmail").value = "";
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

window.onload = function() {
    clearSigninForm();
    showPassword();
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


// links
forgottenLink.onclick = function() {
    renderForgotten();
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
            throw new Error("Network response was not ok");
        }
        return response.json();
    }) 
    .then(jsonResponse => {
        clearAlerts();

        // email aready exists
        if (jsonResponse.emailExists) {
            emailExists.style.display = "block";
            heading.style.display = "none";
            forms.style.display = "none";
        } 

        else {
            // user created success & email sent success
            if (jsonResponse.userCreated && jsonResponse.emailSent) {
                verify.style.display = "block";
                heading.style.display = "none";
                forms.style.display = "none";
            }

            // user created success & email sent fail
            else if (jsonResponse.userCreated && !jsonResponse.emailSent) {
                unableToSendEmail.style.display = "block";
                heading.style.display = "none";
                forms.style.display = "none";
            } 

            // uesr created fail
            else if (!jsonResponse.userCreated) {
                unableToCreateUser.style.display = "block";
            } 
        } 
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
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
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(jsonResponse => {
        clearAlerts();

        // email exists
        if (jsonResponse.emailExists && jsonResponse.passwordVerified) {

            // email verified
            if (jsonResponse.emailVerified) {
                window.location.href = "account.html";
            }

            // not verified
            else {
                resend.style.display = "block";
                clearSigninForm();
            }
        }

        // incorrect email
        else {
            incorrectDetails.style.display = "block";
            signinForm.password.value = "";
        }
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
    });
};


// forgotten password form 
forgottenForm.onsubmit = function(event) {
    clearAlerts();
    event.preventDefault();

    const formData = new FormData(this);

    fetch("php/forgotten.php", {
        method: "post",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // email link sent
        const forgotten = document.querySelector("#forgottenVerification");
        forgotten.style.display = "block";
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
    });
};