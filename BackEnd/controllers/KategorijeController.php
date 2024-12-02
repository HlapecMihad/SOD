<?php

include_once __DIR__ .  '/../models/Kategorije.php';
include_once __DIR__ .  '/../Database.php';

class KategorijeController {
   public function vrniKategorije()
   {
       $kategorijeModel = new Kategorije();
       $response = $kategorijeModel->vrniKategorije();
 
       // Set JSON header
       //header('Content-Type: application/json');
 
       // Output the response in JSON format
       echo json_encode($response);
   }

   public function dodajKategorijo($data)
    {
        $kategorijeModel = new Kategorije();
        $naziv = $data['naziv'];
        //log_data($naziv);

        if ($kategorijeModel->dodajKategorijo($naziv)) {
            echo json_encode(['status' => 'success', 'message' => 'Kategorija uspesno dodana']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Kategorija ze obstaja']);
        }
    }

    public function izbrisiKategorijo($id)
    {
        $kategorijaModel = new Kategorije();
        if ($kategorijaModel->izbrisiKategorijo($id)) {
            echo json_encode(['status' => 'success', 'message' => 'Uspešno izbrisana kategorija']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Napaka!!!!']);
        }
    }
}
?>
