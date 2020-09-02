const passwordReset = document.querySelector("#passwordReset");
const reset = document.querySelector("#reset");
const notReset = document.querySelector("#notReset");
const noToken = document.querySelector("#noToken");

function clearAlerts() {
    const alertCollection = document.getElementsByClassName("alert");

    for (let i = 0; i < alertCollection.length; i++) {
        alertCollection[i].style.display = "none";
    }
}

passwordReset.onsubmit = function(event) {
    event.preventDefault();
    clearAlerts();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get("accessToken");
    document.querySelector("#accessToken").value = accessToken;
    const formData = new FormData(this);

    fetch("php/reset.php", {
        method: "post",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            //window.location.href = "error.html";
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(jsonResponse => {
        if (jsonResponse.tokenExists == false) {
            noToken.style.display = "block";
        }

        else {
            if(jsonResponse.reset) {
                reset.style.display = "block";
            }

            else {
                notReset.style.display = "block";
            }
        }
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
        //window.location.href = "error.html";
    });    
};

signinBtn.onclick = function() {
    window.location.href = "index.html";
}