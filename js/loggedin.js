const signoutBtn = document.getElementById("signoutBtn");
const accountBtn = document.getElementById("accountBtn");

signoutBtn.onclick = function() {
    // Need to remove capability to press back button to access account
    window.location.href = "index.html";
}

accountBtn.onclick = function() {
    window.location.href = "account.html";
}