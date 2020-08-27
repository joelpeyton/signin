const registerBtn = document.getElementById("registerBtn");
const registerLink = document.getElementById("registerLink");
const heading = document.getElementById("heading");
const signinForm = document.getElementById("signinForm");
const registerForm = document.getElementById("registerForm");
const registerBox = document.getElementById("registerBox");
const signinBtn = document.getElementById("signinBtn");
const verify = document.getElementById("verify");
const verifyUsername = document.getElementById("verifyUsername");

registerBtn.onclick = function() {
    renderRegister();
}

registerLink.onclick = function() {
    renderRegister();
}

signinBtn.onclick = function() {
    renderSignin();
}

function renderSignin() {
    signinForm.style.display = "block";
    registerForm.style.display = "none";
    registerBox.style.display = "block";
    heading.innerText = "Sign in to Acme";
    signinBtn.parentElement.classList.add("active");
    registerBtn.parentElement.classList.remove("active");
}

function renderRegister() {
    signinForm.style.display = "none";
    registerForm.style.display = "block";
    registerBox.style.display = "none";
    heading.innerText = "Create your account";
    signinBtn.parentElement.classList.remove("active");
    registerBtn.parentElement.classList.add("active");
}

function clearForm() {
    registerForm.username.value = "";
    registerForm.email.value = "";
    registerForm.password.value = "";
}

registerForm.onsubmit = function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch("php/register.php", {
        method: "post",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            window.location("error.html");
            throw new Error("Network response was not ok");
        }
        return response.json();
    }) 
    .then(jsonResponse => {
        console.log(jsonResponse);
        
        if (jsonResponse.emailExists) {
            document.getElementById("emailExists").style.display = "block";
        } 
        else {
            if (jsonResponse.userCreated && jsonResponse.emailSent) {
                document.getElementById("verify").style.display = "block";
            }
            else if (jsonResponse.userCreated && !jsonResponse.emailSent) {
                document.getElementById("unableToSendEmail").style.display = "block";
            } 
            else if (!jsonResponse.userCreated) {
                document.getElementById("unableToCreateUser").style.display = "block";
            } 
        } 
        
        clearForm();
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
        window.location("error.html");
    });
};