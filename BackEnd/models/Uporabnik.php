<?php

require_once __DIR__ . '/../Database.php';
require __DIR__ . '/../vendor/autoload.php'; // PHPMailer
$log_file = __DIR__ . '/log.txt';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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
            throw new Exception("Failed to initialize database connection: " . $e->getMessage());
        }
    }

    public function vrniUporabnike()
    {
        try {
            $query = "SELECT * FROM uporabnik";
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            $uporabniki = $stmt->fetchAll(PDO::FETCH_ASSOC);
     
            // vrnitev uporabnikov
            return [
                "status" => "success",
                "data" => $uporabniki,
            ];
        } catch (PDOException $e) {
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
            // Preverjanje, ce mail ze obstaja
            $checkQuery = "SELECT * FROM uporabnik WHERE mail = :mail";
            $stmt = $this->db->prepare($checkQuery);
            $stmt->execute(['mail' => $mail]);
    
            if ($stmt->rowCount() > 0) {
                return false;
            }
    
            // hashiranje gesla
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
            // Dodaj uporabnika
            $insertQuery = "INSERT INTO uporabnik (ime, priimek, mail, password) VALUES (:ime, :priimek, :mail, :password)";
            $stmt = $this->db->prepare($insertQuery);
            $success = $stmt->execute([
                'ime' => $ime,
                'priimek' => $priimek,
                'mail' => $mail,
                'password' => $hashedPassword,
            ]);
    
            if ($success) {
                // mail s PHPMailer
                $this->sendConfirmationEmail($ime, $priimek);
            }
    
            return $success;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    private function sendConfirmationEmail($ime, $priimek)
    {
        $mail = new PHPMailer(true);
        $recipientEmail = 'aljaz.kodric03@gmail.com';
    
        try {
            // Debug datoteka
            $mail->SMTPDebug = 3; // Debug level
            $mail->Debugoutput = function ($str, $level) {
               file_put_contents('phpmailer_debug.log', "Debug level [$level]: $str" . PHP_EOL, FILE_APPEND);
           };
           
    
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; // gmal SMTP server
            $mail->SMTPAuth = true;
            $mail->Username = 'kodric558@gmail.com'; // posiljatelj
            $mail->Password = 'nrgm yvcc gddy ugwp'; // app geslo gmaila
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            // ugasnil sem si preverjanje certifikata, ker mi drugace ne dela, moj antivirus vse blokira
            $mail->SMTPOptions = [
               'ssl' => [
                   'verify_peer' => false,
                   'verify_peer_name' => false,
                   'allow_self_signed' => true,
               ],
            ];
    
            // prejemnik
            $mail->setFrom('kodric558@gmail.com', 'SOD');
            $mail->addAddress($recipientEmail, "$ime $priimek");
    
            // vsebina
            $mail->isHTML(true);
            $mail->Subject = 'Uspesna registracija';
            $mail->Body = "
                <p>$ime $priimek</p>
                <p>Uspesna registracija</p>
                <p>Hvala za uporabljanje moje precufovite aplikacije</p>
                <p>Wow kako je lepa</p>

            ";
            $mail->AltBody = "$ime $priimek, Uspesna registracija";
    
            $mail->send();
            echo "Confirmation email sent successfully.";
        } catch (Exception $e) {
            echo "Confirmation email could not be sent. Mailer Error: {$mail->ErrorInfo}";
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
