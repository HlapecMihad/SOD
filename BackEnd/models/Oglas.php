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
           // Step 1: Fetch oglas with kategorije and id_uporabnika
           $query = "
               SELECT 
                   oglas.id_oglas, 
                   oglas.text, 
                   oglas.datumObjave, 
                   kategorije.naziv AS kategorija_naziv, 
                   oglas.id_uporabnika
               FROM oglas
               INNER JOIN kategorije ON oglas.id_kategorije = kategorije.id_kategorije;
           ";
           $stmt = $this->db->prepare($query);
           $stmt->execute();
           $oglasi = $stmt->fetchAll(PDO::FETCH_ASSOC);
   
           // Step 2: Fetch ime and priimek for each id_uporabnika
           foreach ($oglasi as &$oglas) {
               $userQuery = "SELECT ime, priimek, mail FROM uporabnik WHERE id_uporabnika = :id_uporabnika";
               $userStmt = $this->db->prepare($userQuery);
               $userStmt->execute(['id_uporabnika' => $oglas['id_uporabnika']]);
               $user = $userStmt->fetch(PDO::FETCH_ASSOC);
   
               if ($user) {
                   $oglas['ime'] = $user['ime'];
                   $oglas['priimek'] = $user['priimek'];
                   $oglas['mail'] = $user['mail'];
               } else {
                   $oglas['ime'] = null;
                   $oglas['priimek'] = null;
                   $oglas['mail'] = null;
               }
           }
   
           return [
               "status" => "success",
               "data" => $oglasi,
           ];
       } catch (PDOException $e) {
           log_data("Error fetching oglas: " . $e->getMessage());
           return [
               "status" => "error",
               "message" => "Error fetching oglas: " . $e->getMessage(),
           ];
       }
   }
   
   

   public function dodajOglas($text, $datumObjave, $id_kategorije, $email)
   {
       try {
           // pretvori email v id_uporabnika
           $getUserIdQuery = "SELECT id_uporabnika FROM uporabnik WHERE mail = :email";
           $stmt = $this->db->prepare($getUserIdQuery);
           $stmt->execute(['email' => $email]);
   
           // Fetch id_uporabnika
           $user = $stmt->fetch(PDO::FETCH_ASSOC);
   
           if (!$user) {
               throw new Exception("User not found with the provided email.");
           }
   
           $id_uporabnika = $user['id_uporabnika'];
   
           // vstavi id_uporabnika v oglas skupaj z vsemi preostalimi podatki
           $insertQuery = "INSERT INTO oglas (text, datumObjave, id_kategorije, id_uporabnika) 
                           VALUES (:text, :datumObjave, :id_kategorije, :id_uporabnika)";
           $stmt = $this->db->prepare($insertQuery);
   
           return $stmt->execute([
               'text' => $text,
               'datumObjave' => $datumObjave,
               'id_kategorije' => $id_kategorije,
               'id_uporabnika' => $id_uporabnika
           ]);
       } catch (Exception $e) {
           echo "Error: " . $e->getMessage();
           return false;
       }
   }
   

   public function izbrisiOglas($id_oglas)
   {
       try {

           $query = "DELETE FROM oglas WHERE id_oglas = :id";
           $stmt = $this->db->prepare($query);
           $stmt->execute(['id' => $id_oglas]);
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
