window.onload = function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const error = urlParams.get("error");
    const arr = error.split(":");
    const code = arr[1].trim();
    const message = arr[2];

    document.querySelector("#code").innerText = code;
    document.querySelector("#message").innerText = message;
};
