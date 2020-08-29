<?php

Class User {

    // database connection and table name
    private $conn;
    private $table = "users";

    // properties
    public $id;
    public $firstName;
    public $lastName;
    public $email;
    public $password;
    public $accessToken;
    public $status = 0; 

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

        // email already in database 
        // populate user object
        // return true
        if ($stmt->rowCount() > 0) {
            // get record
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->id = $row["id"];
            $this->firstName = $row["firstName"];
            $this->lastName = $row["lastName"];
            $this->password = $row["password"];
            $this->status = $row["status"];

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
        firstName = :firstName,
        lastName = :lastName,
        email = :email, 
        password = :password, 
        status = :status, 
        accessToken = :accessToken";

        $stmt = $this->conn->prepare($query);

        // bind parameters
        $stmt->bindParam(":firstName", $this->firstName);
        $stmt->bindParam(":lastName", $this->lastName);
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

    // get user by id
    function readOne() {
        // prepare query
        $query = "SELECT * FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);

        // bind parameters
        $stmt->bindParam(1, $this->id);

        // execute statement
        $stmt->execute();
 
        // populate user object
        if ($stmt->rowCount() > 0) {
            // get record
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->firstName = $row["firstName"];
            $this->lastName = $row["lastName"];
            $this->password = $row["password"];
            $this->email = $row["email"];

            return true;
        } 
        
        // else no user with that id exists
        else {
            return false;
        }
    }

    // update user
    function updateUser() {
        // prepare query
        $query = "UPDATE " . $this->table . "
        SET 
        firstName = :firstName,
        lastName = :lastName,
        email = :email,
        password = :password
        WHERE 
        id = :id";

        $stmt = $this->conn->prepare($query);

        // bind parameters
        $stmt->bindParam(":firstName", $this->firstName);
        $stmt->bindParam(":lastName", $this->lastName);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":id", $this->id);

        // execute statement
        if ($stmt->execute()) {
            return true;
        }
        else {
            return false;
        }
    }

    // check if access token exists
    function tokenExists() {
        // prepare query
        $query = "SELECT * FROM " . $this->table . " WHERE accessToken = ?";
        $stmt = $this->conn->prepare($query);

        // bind parameters
        $stmt->bindParam(1, $this->accessToken);

        // execute statement
        $stmt->execute();

        // token exists
        // get user id
        // change status to 1
        // return true
        if ($stmt->rowCount() > 0) {
            // get record
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->id = $row["id"];
            $this->status = $row["status"];

            return true;
        } 
        
        // else no user with that email exists
        else {
            return false;
        }
    }

    // update users status
    function updateStatus() {
        // prepare query
        $query = "UPDATE " . $this->table . "
        SET 
        status = :status
        WHERE 
        id = :id";

        $stmt = $this->conn->prepare($query);

        // bind parameters
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":id", $this->id);

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