<?php

Class Utils {

    function sendMail($receiver, $subject, $body) {
        $sender = "Acme Corporation";
        $senderEmail = "joelpeyton@hotmail.co.uk";
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
        $headers .= "From:" . $sender . "<" . $senderEmail . ">";

        if (mail($receiver, $subject, $body, $headers)) {
            return true;
        }

        return false;
    } 

    function getToken() {
        $length = 32;
        $bytes = openssl_random_pseudo_bytes($length);
        $token = bin2hex($bytes);
        return $token;
    }
}
?>