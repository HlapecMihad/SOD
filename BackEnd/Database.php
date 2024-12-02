<?php
class Database {
    private $server = 'localhost';
    private $dbname = 'sod';
    private $user = 'root';
    private $pass = 'root';

    public function connect()
    {
        try {
            $conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn; // Return the PDO connection if successful
        } catch (PDOException $e) {
            // Instead of echoing, throw an exception
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }
}
?>
