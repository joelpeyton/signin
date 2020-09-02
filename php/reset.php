<?php
include_once "core.php";
include_once "database.php";
include_once "user.php";
include_once "utils.php";

if ($_POST) {

    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    // create a new user and set id
    $user = new User($db);
    $user->accessToken = htmlspecialchars(strip_tags($_POST["accessToken"]));
    $user->password = htmlspecialchars(strip_tags($_POST["password"]));

    // check if token exists in database
    if ($user->tokenExists()) {
        if ($user->resetPassword()) {
            $result["reset"] = true;
        }

        else {
            $result["reset"] = false;
        }
    }
    // no access token exists
    else {
        $result["tokenExists"] = false;
    }

    echo json_encode($result);
}

?>