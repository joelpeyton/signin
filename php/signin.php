<?php
include_once "core.php";
include_once "database.php";
include_once "user.php";
include_once "utils.php";

// if signin form submitted
if ($_POST) {

    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    // create a new user and set email
    $user = new User($db);
    $user->email = htmlspecialchars(strip_tags($_POST["email"]));

    // check to see if email exists
    $emailExists = $user->emailExists();

    // if email exists
    if ($emailExists) {
        $result["emailExists"] = true;

        // validate password
        $password = htmlspecialchars(strip_tags($_POST["password"])); 
        if (password_verify($password, $user->password)) {
            $result["passwordVerified"] = true;

            // check that email has been verified
            if ($user->status == 1) {
                // create session variables
                $_SESSION["loggedIn"] = true;
                $_SESSION["userID"] = $user->id;
                $_SESSION["firstName"] = $user->firstName;
                $_SESSION["lastName"] = $user->lastName;

                $result["emailVerified"] = true;

            }
            else {
                $_SESSION["loggedIn"] = false;

                $result["emailVerified"] = false;
            }
        } 
        else {
            $result["passwordVerified"] = false;
        } 
    }
    else {
        $result["emailExists"] = false;
    }

    echo json_encode($result);
}

?>