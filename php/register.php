<?php
include_once "core.php";
include_once "database.php";
include_once "user.php";
include_once "utils.php";

// if registration form submitted
if ($_POST) {

    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    // create a new user and set email
    $user = new User($db);
    $user->email = htmlspecialchars(strip_tags($_POST["email"]));

    // create a utility object
    $utils = new Utils();

    // check to see if email already exists
    $emailExists = $user->emailExists();

    // if email exists registration failed 
    if ($emailExists) {
        $result["emailExists"] = true;
    } 

    // registration success
    // create new user 
    else {
        $result["emailExists"] = false;

        // set initial user properties
        $user->firstName = htmlspecialchars(strip_tags($_POST["firstName"]));
        $user->lastName = htmlspecialchars(strip_tags($_POST["lastName"]));
        $user->password = htmlspecialchars(strip_tags($_POST["password"]));
        $user->email = htmlspecialchars(strip_tags($_POST["email"]));

        // create an access token for verification
        $accessToken = $utils->getToken();
        $user->accessToken = $accessToken;

        // add user to database
        $userCreated = $user->create();

        // send verification email if user created
        if ($userCreated) {
            $result["userCreated"] = true;

            $receiver = $user->email;
            $subject = "Acme Corporation, verify email";
            $body = "{ $user->firstName }, Thanks for registering with Acme Corporation.\n";
            $body .= "Please verify your email by clicking the following link\n";
            $body .= "{ $homeUrl }verify/?accessToken={ $accessToken }";

            if ($utils->sendMail($receiver, $subject, $body)) {
                $result["emailSent"] = true;
            }
            else {
                $result["emailSent"] = false;
            }
            
            // remove posted values
            $_POST = array();
        }

        else {
            $result["userCreated"] = false;
        }

    }

    echo json_encode($result);
}

?>