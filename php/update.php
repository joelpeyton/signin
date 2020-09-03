<?php
include_once "core.php";
include_once "database.php";
include_once "user.php";
include_once "utils.php";

// if update form submitted
if ($_POST) {

    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    // create a new user and set id
    $user = new User($db);
    $user->id = htmlspecialchars(strip_tags($_POST["id"]));

    //get users current information
    $user->readOne();

    // get post information
    $firstName = htmlspecialchars(strip_tags($_POST["firstName"]));
    $lastName = htmlspecialchars(strip_tags($_POST["lastName"]));
    $email = htmlspecialchars(strip_tags($_POST["email"]));

    if (isset($_POST["password"])) {
        $newPassword = htmlspecialchars(strip_tags($_POST["password"]));
    }

    // check for differences 
    $changes = false;
    $emailExists = false;
    $result["changed"] = [];

    if ($firstName != $user->firstName) {
        $user->firstName = $firstName;
        $changes = true;
        array_push($result["changed"], "First Name");        
    } 

    if ($lastName != $user->lastName) {
        $user->lastName = $lastName;
        $changes = true;
        array_push($result["changed"], "Last Name");
    }
        
    if ($email != $user->email) {
        $user->email = $email;

        if ($user->emailExists()) {
            $emailExists = true;
            $result["emailExists"] = true;
        } else {
            $changes = true;
            array_push($result["changed"], "Email");
        }
        
    }

    if ($newPassword) {
        $password_hash = password_hash($newPassword, PASSWORD_BCRYPT);
        if ($password_hash != $user->$password) {
            $user->password = $password_hash;
            $changes = true;
            array_push($result["changed"], "Password");
        }
    }

    // update if differences
    if ($changes && !$emailExists && $_SESSION["loggedIn"] == true) {
        $result["updated"] = $user->updateUser();
        $result["user"] = $user;
    }

    echo json_encode($result);
}

?>