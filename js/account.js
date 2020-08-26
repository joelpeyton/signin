const changePasswordBtn = document.getElementById("changePasswordBtn");

changePasswordBtn.onclick = function() {
    const passwordCollection = document.getElementsByClassName("changePassword");

    for (let i = 0; i < passwordCollection.length; i++) {
        passwordCollection[i].style.display = "block";
    };

    changePasswordBtn.style.display = "none";
}