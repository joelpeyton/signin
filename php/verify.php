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

    if ($user->tokenExists()) {
        if ($user->status == "0") {
            $user->updateStatus();
            $result["status"] = "updated";
        }
        else {
            $result["error"] = "verified";
        }
        
    }
    else {
        $result["error"] = "no token";
    }

    echo json_encode($result);
}

?>