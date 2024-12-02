<?php

require_once __DIR__ . '/../Database.php';
$log_file = __DIR__ . '/log.txt';

function log_data($data)
{
    global $log_file;
    $log_entry = "[" . date('Y-m-d H:i:s') . "] " . $data . "\n";
    file_put_contents($log_file, $log_entry, FILE_APPEND);
}

class Uporabnik {
    private $db;

    public function __construct()
    {
        try {
            $dbConnect = new Database();
            $this->db = $dbConnect->connect();
        } catch (Exception $e) {
            // Handle connection failure gracefully
            throw new Exception("Failed to initialize database connection: " . $e->getMessage());
        }
    }

    public function vrniUporabnike()
    {
        try {
            // Select only non-sensitive fields
            $query = "SELECT * FROM uporabnik";
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            $uporabniki = $stmt->fetchAll(PDO::FETCH_ASSOC);
     
            // Return the users in a structured response
            return [
                "status" => "success",
                "data" => $uporabniki,
            ];
        } catch (PDOException $e) {
            // Log the error and return a structured error response
            log_data("Error fetching users: " . $e->getMessage());
            return [
                "status" => "error",
                "message" => "Error fetching users: " . $e->getMessage(),
            ];
        }
    }

    public function registerUser($ime, $priimek, $mail, $password)
    {
        try {
            //log_data($ime, $priimek, $mail, $password);
            $checkQuery = "SELECT * FROM uporabnik WHERE mail = :mail";
            $stmt = $this->db->prepare($checkQuery);
            $stmt->execute(['mail' => $mail]);

            if ($stmt->rowCount() > 0) {
                return false;
            }

            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            $insertQuery = "INSERT INTO uporabnik (ime, priimek, mail, password) VALUES (:ime, :priimek, :mail, :password)";
            $stmt = $this->db->prepare($insertQuery);
            return $stmt->execute([
                'ime' => $ime,
                'priimek' => $priimek,
                'mail' => $mail,
                'password' => $hashedPassword,
            ]);
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    public function preveriUporabnika($email, $password)
    {
        try {
            $query = "SELECT password FROM uporabnik WHERE mail = :email";
            $stmt = $this->db->prepare($query);
            $stmt->execute(['email' => $email]);

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                return true;
            }

            return false;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    public function izbrisiUporabnika($id)
    {
        try {
            $query = "DELETE FROM uporabnik WHERE id_uporabnika = :id";
            $stmt = $this->db->prepare($query);
            $stmt->execute(['id' => $id]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
}
?>
