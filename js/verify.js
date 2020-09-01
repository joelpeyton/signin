window.onload = function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const result = urlParams.get("result");

    if (result == "1") {
        document.getElementById("verified").style.display = "block";
    } else if (result == "2") {
        document.getElementById("alreadyVerified").style.display = "block";
    } else {
        document.getElementById("notVerified").style.display = "block";
    }
};

signinBtn.onclick = function() {
    window.location.href = "index.html";
}