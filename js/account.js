const changePasswordBtn = document.getElementById("changePasswordBtn");
const signoutBtn = document.getElementById("signoutBtn");

changePasswordBtn.onclick = function() {
    const passwordCollection = document.getElementsByClassName("changePassword");

    for (let i = 0; i < passwordCollection.length; i++) {
        passwordCollection[i].style.display = "block";
    };

    changePasswordBtn.style.display = "none";
}

signoutBtn.onclick = function() {
    // Need to remove capability to press back button to access account
    window.location.href = "index.html";
}