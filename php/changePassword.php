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
        header("Location: ../reset.html?accessToken=$user->accessToken");
    }
    // no access token exists
    else {
        header("Location: ../reset.html?accessToken=null");
    }

}

?>