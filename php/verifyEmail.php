<?php
include_once "core.php";
include_once "database.php";
include_once "user.php";
include_once "utils.php";

if ($_GET) {

    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    // create a new user and set id
    $user = new User($db);
    $user->accessToken = htmlspecialchars(strip_tags($_GET["accessToken"]));

    // check if token exists in database
    if ($user->tokenExists()) {
        // if account not verified
        if ($user->status == "0") {
            // change status and update 
            $user->status = "1";
            $user->updateStatus();
            header("Location: ../verify.html?result=1"); 
        }
        // else already verified
        else {
            header("Location: ../verify.html?result=2");
        }
        
    }
    // no access token exists
    else {
        header("Location: ../verify.html?result=3");
    }

    echo json_encode($result);
}

?>