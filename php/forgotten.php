<?php
include_once "core.php";
include_once "database.php";
include_once "user.php";
include_once "utils.php";

// if reset password form submitted
if ($_POST) {

    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    // create a new user and set email
    $user = new User($db);
    $user->email = htmlspecialchars(strip_tags($_POST["email"]));

    // create a utility object
    $utils = new Utils();

    // check to see if email exists
    $emailExists = $user->emailExists();

    // if email exists
    if ($emailExists) {
        $receiver = $user->email;
        $subject = "Acme Corporation, reset password";
        $body = "{ $user->firstName }, We got a request to reset your Acme account password. If that was you, please follow the link below:\n";
        $body .= "{ $homeUrl }/php/changePassword.php?accessToken={ $user->accessToken }";

        $utils->sendMail($receiver, $subject, $body);
        
        // remove posted values
        $_POST = array();
    }
}
?>