<?php

require_once __DIR__ . '/../Database.php';

class Oglas {
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

   public function vrniOglas()
   {
       try {
           // Use a JOIN query to fetch the category name along with oglas data
           $query = "
               SELECT oglas.id_oglas, oglas.text, oglas.datumObjave, kategorije.naziv AS kategorija_naziv FROM oglas INNER JOIN kategorije ON oglas.id_kategorije = kategorije.id_kategorije;
           ";
           $stmt = $this->db->prepare($query);
           $stmt->execute();
           $oglas = $stmt->fetchAll(PDO::FETCH_ASSOC);
   
           return [
               "status" => "success",
               "data" => $oglas,
           ];
       } catch (PDOException $e) {
           log_data("Error fetching oglas: " . $e->getMessage());
           return [
               "status" => "error",
               "message" => "Error fetching oglas: " . $e->getMessage(),
           ];
       }
   }
   

   public function dodajOglas($text, $datumObjave, $id_kategorije)
   {
       try {

           $insertQuery = "INSERT INTO oglas (text, datumObjave, id_kategorije) VALUES (:text, :datumObjave, :id_kategorije)";
           $stmt = $this->db->prepare($insertQuery);
           return $stmt->execute([
               'text' => $text,
               'datumObjave' => $datumObjave,
               'id_kategorije' => $id_kategorije
           ]);
       } catch (PDOException $e) {
           echo "Error: " . $e->getMessage();
           return false;
       }
   }

   public function izbrisiOglas($id)
   {
       try {
           $query = "DELETE FROM oglas WHERE id_oglas = :id";
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
