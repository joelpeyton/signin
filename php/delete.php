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
    $user->id = htmlspecialchars(strip_tags($_GET["id"]));

    // get user data
    if ($user->readOne()) {
        // add user to a record of deleted users
        $user->addUserToDeleted();
        
        // delete success
        if ($user->deleteUser()) {
            $result["deleted"] = true;
        }

        // delete fail
        else {
            $result["deleted"] = false;
        }
    }

    // no user data
    else {
        $result["userExists"] = false;
    }

    echo json_encode($result);

}

?>