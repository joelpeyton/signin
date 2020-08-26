const registerBtn = document.getElementById("registerBtn");
const registerLink = document.getElementById("registerLink");
const heading = document.getElementById("heading");
const signinForm = document.getElementById("signinForm");
const registerForm = document.getElementById("registerForm");
const registerBox = document.getElementById("registerBox");
const signinBtn = document.getElementById("signinBtn");

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
    registerBtn.parentElement.classList.register("active");
}

function renderRegister() {
    signinForm.style.display = "none";
    registerForm.style.display = "block";
    registerBox.style.display = "none";
    heading.innerText = "Create your account";
    signinBtn.parentElement.classList.remove("active");
    registerBtn.parentElement.classList.add("active");
}