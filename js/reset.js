import { clearAlerts, showPassword } from "./utils.js";

// form
const passwordReset = document.querySelector("#passwordReset");

// allow check button to show password
window.onload = function() {
    showPassword();
}

// button event
signinBtn.onclick = function() {
    window.location.href = "index.html";
}

// reset password form
passwordReset.onsubmit = function(event) {
    event.preventDefault();
    clearAlerts();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get("accessToken");
    
    const token = document.querySelector("#accessToken");
    token.value = accessToken;

    const reset = document.querySelector("#reset");
    const notReset = document.querySelector("#notReset");
    const noToken = document.querySelector("#noToken");
    
    const formData = new FormData(this);

    fetch("php/reset.php", {
        method: "post",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(jsonResponse => {
        
        // no matching token
        if (jsonResponse.tokenExists == false) {
            noToken.style.display = "block";
        }

        else {
            // reset success
            if(jsonResponse.reset) {
                reset.style.display = "block";
            }

            // reset fail
            else {
                notReset.style.display = "block";
            }
        }
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
    });    
};

