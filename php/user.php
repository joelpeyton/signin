<?php

Class User {

    // database connection and table name
    private $conn;
    private $table = "users";

    // properties
    public $id;
    public $username;
    public $name;
    public $telephone;
    public $addressOne;
    public $addressTwo;
    public $city;
    public $postcode;
    public $email;
    public $password;
    public $accessToken;
    public $status = 0; // 0 = pending, 1 = verified

    // constructor
    public function __construct($db) {
        $this->conn = $db;
    }

    //// methods ////

    // check if email already in database
    function emailExists() {
        // prepare query
        $query = "SELECT * FROM " . $this->table . " WHERE email = ?";
        $stmt = $this->conn->prepare($query);

        // bind parameters
        $stmt->bindParam(1, $this->email);

        // execute statement
        $stmt->execute();

        // email already in database return true
        if ($stmt->rowCount() > 0) {
            return true;
        } 
        
        // else no user with that email exists
        else {
            return false;
        }
    }

    // add new user to database;
    function create() {
        // prepare query
        $query = "INSERT INTO " . $this->table . "
        SET 
        username = :username,
        email = :email, 
        password = :password, 
        status = :status, 
        accessToken = :accessToken";

        $stmt = $this->conn->prepare($query);

        // bind parameters
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":email", $this->email);
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(":password", $password_hash);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":accessToken", $this->accessToken);

        // execute statement
        if ($stmt->execute()) {
            return true;
        }
        else {
            return false;
        }
    }

    
}
?>