function showPassword() {
    const show = document.getElementById("showPassword");
    const password = document.getElementById("password") || document.getElementById("newPassword");

    show.onchange = function() {
        if (show.checked) {
            password.setAttribute("type", "text");
        } else {
            password.setAttribute("type", "password");
        }
    }
}


function clearAlerts() {
    const alertCollection = document.getElementsByClassName("alert");

    for (let i = 0; i < alertCollection.length; i++) {
        alertCollection[i].style.display = "none";
    }
}


export { clearAlerts, showPassword };