window.onload = function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const result = urlParams.get("result");
    const verified = document.querySelector("#verified");
    const already = document.querySelector("#alreadyVerified");
    const not = document.querySelector("#notVerified");

    if (result == "1") {
        verified.style.display = "block";
    } else if (result == "2") {
        already.style.display = "block";
    } else {
        not.style.display = "block";
    }
};

signinBtn.onclick = function() {
    window.location.href = "index.html";
}