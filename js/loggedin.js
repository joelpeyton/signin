// buttons and links
const signoutBtn = document.getElementById("signoutBtn");
const accountBtn = document.getElementById("accountBtn");

signoutBtn.onclick = function() {
    // Need to remove capability to press back button to access account
    window.location.href = "index.html";
}

accountBtn.onclick = function() {
    window.location.href = "account.html";
}

window.onload = function() {
    fetch("php/account.php")
    .then(response => {
        if (!response.ok) {
            window.location.href = "error.html";
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(jsonResponse => {
        document.getElementById("accountName").innerText = jsonResponse.firstName;
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
        window.location.href = "error.html";
    });
};