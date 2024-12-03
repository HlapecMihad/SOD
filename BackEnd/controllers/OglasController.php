<?php

include_once __DIR__ .  '/../models/Oglas.php';

class OglasController {
   public function vrniOglas()
   {
       $oglasModel = new Oglas();
       $response = $oglasModel->vrniOglas();
 
       // Set JSON header
       //header('Content-Type: application/json');
 
       // Output the response in JSON format
       echo json_encode($response);
   }

   public function dodajOglas($data)
    {
        $oglasModel = new Oglas();
        $text = $data['text'];
        $datumObjave = $data['datumObjave'];
        $id_kategorije = $data['id_kategorije'];
        $email = $data['id_uporabnika'];
        //log_data($id_kategorije);

        if ($oglasModel->dodajOglas($text, $datumObjave, $id_kategorije, $email)) {
            echo json_encode(['status' => 'success', 'message' => 'Oglas uspesno dodan']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Oglas ze obstaja']);
        }
    }

    public function izbrisiOglas($id_oglas)
    {
        $oglasModel = new Oglas();
        if ($oglasModel->izbrisiOglas($id_oglas)) {
            echo json_encode(['status' => 'success', 'message' => 'Uspešno izbrisan oglas']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Napaka!!!!']);
        }
    }
}
?>
