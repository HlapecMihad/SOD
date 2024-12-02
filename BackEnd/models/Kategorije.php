<?php

require_once __DIR__ . '/../Database.php';

class Kategorije {
    private $db;

    public function __construct()
    {
        try {
            $dbConnect = new Database();
            $this->db = $dbConnect->connect();
        } catch (Exception $e) {
            throw new Exception("Failed to initialize database connection: " . $e->getMessage());
        }
    }

    public function vrniKategorije()
    {
        try {
            $query = "SELECT * FROM kategorije";
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            $kategorije = $stmt->fetchAll(PDO::FETCH_ASSOC);
     
            return [
                "status" => "success",
                "data" => $kategorije,
            ];
        } catch (PDOException $e) {
            log_data("Error fetching kategorije: " . $e->getMessage());
            return [
                "status" => "error",
                "message" => "Error fetching kategorije: " . $e->getMessage(),
            ];
        }
    }

    public function dodajKategorijo($naziv)
    {
        try {
            $checkQuery = "SELECT * FROM kategorije WHERE naziv = :naziv";
            $stmt = $this->db->prepare($checkQuery);
            $stmt->execute(['naziv' => $naziv]);

            if ($stmt->rowCount() > 0) {
                return false;
            }

            $insertQuery = "INSERT INTO kategorije (naziv) VALUES (:naziv)";
            $stmt = $this->db->prepare($insertQuery);
            return $stmt->execute([
                'naziv' => $naziv
            ]);
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    public function izbrisiKategorijo($id)
    {
        try {
            $query = "DELETE FROM kategorije WHERE id_kategorije = :id";
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
