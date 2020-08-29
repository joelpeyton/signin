window.onload = function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get("accessToken");

    fetch("php/verify.php?accessToken=" + token)
    .then(response => {
        if (!response.ok) {
            window.location.href = "error.html";
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(jsonResponse => {
        if (jsonResponse.status == "updated") {
            document.getElementById("verified").style.display = "block";
        } 
        else {
            if (jsonResponse.error == "no token") {
                document.getElementById("notVerified").style.display = "block";
            }
            else {
                document.getElementById("alreadyVerified").style.display = "block";
            }
        }
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
        window.location.href = "error.html";
    });
};

signinBtn.onclick = function() {
    window.location.href = "index.html";
}