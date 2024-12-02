<?php

include_once __DIR__ .  '/../models/Uporabnik.php';

class UporabnikController {
   public function vrniUporabnike()
   {
       $uporabnikModel = new Uporabnik();
       $response = $uporabnikModel->vrniUporabnike();
 
       // Set JSON header
       //header('Content-Type: application/json');
 
       // Output the response in JSON format
       echo json_encode($response);
   }

   public function register($data)
    {
        $uporabnikModel = new Uporabnik();
        $ime = $data['ime'];
        $priimek = $data['priimek'];
        $mail = $data['mail'];
        $password = $data['password'];
        //log_data($ime, $priimek, $mail, $password);

        if ($uporabnikModel->registerUser($ime, $priimek, $mail, $password)) {
            echo json_encode(['status' => 'success', 'message' => 'Registracija uspešna']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Uporabnik že obstaja']);
        }
    }

    public function login($data)
    {
        $uporabnikModel = new Uporabnik();
        $email = $data['email'];
        $password = $data['password'];
        //log_data($password);

        if ($uporabnikModel->preveriUporabnika($email, $password)) {
            echo json_encode(['status' => 'success', 'message' => 'Prijava uspešna']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Napačni email ali geslo']);
        }
    }

    public function izbrisiUporabnika($id)
    {
        $uporabnikModel = new Uporabnik();
        if ($uporabnikModel->izbrisiUporabnika($id)) {
            echo json_encode(['status' => 'success', 'message' => 'Uspešno izbrisan uporabnik']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Napaka!!!!']);
        }
    }
}
?>
