<?php
// Include controllers using absolute paths
require_once __DIR__ . '/../Database.php';
include_once __DIR__ . '/../controllers/UporabnikController.php';
include_once __DIR__ . '/../controllers/OglasController.php';
include_once __DIR__ . '/../controllers/KategorijeController.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

$request_method = $_SERVER['REQUEST_METHOD'];
$endpoint = isset($_GET['action']) ? $_GET['action'] : '';

switch ($endpoint) {
    case 'login':
        if ($request_method === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            $uporabnikController = new UporabnikController();
            //log_data($input['password']);
            $uporabnikController->login($input);
        } else {
            echo json_encode(['message' => 'Invalid request method']);
        }
        break;
        
        case 'vrniUporabnike':
         if ($request_method === 'GET') {
             $uporabnikController = new UporabnikController();
             $uporabnikController->vrniUporabnike();
         } else {
             echo json_encode(['message' => 'Invalid request method']);
         }
         break;

         case 'dodajUporabnika':
            if ($request_method === 'POST') {
                $input = json_decode(file_get_contents('php://input'), true);
                $uporabnikController = new UporabnikController();
                //log_data(print_r($input, true));
                $uporabnikController->register($input);
            } else {
                echo json_encode(['message' => 'Invalid request method']);
            }
            break;

            case 'izbrisiUporabnika':
               if ($request_method === 'DELETE') {
                   $input = json_decode(file_get_contents('php://input'), true);
                   if (isset($input['id_uporabnika'])) {
                       $uporabnikController = new UporabnikController();
                       $uporabnikController->izbrisiUporabnika($input['id_uporabnika']);
                       echo json_encode(['status' => 'success', 'message' => 'Uporabnik izbrisan uspesno']);
                   } else {
                       echo json_encode(['status' => 'error', 'message' => 'Uporabnik ID is missing']);
                   }
               } else {
                   echo json_encode(['message' => 'Invalid request method']);
               }
               break;
      case 'izbrisiKategorijo':
         if ($request_method === 'DELETE') {
               $input = json_decode(file_get_contents('php://input'), true);
               if (isset($input['id_kategorije'])) {
                  $kategorijeController = new KategorijeController();
                  $kategorijeController->izbrisiKategorijo($input['id_kategorije']);
                  echo json_encode(['status' => 'success', 'message' => 'Kategorija izbrisana uspesno!']);
               } else {
                  echo json_encode(['status' => 'error', 'message' => 'Kategorija ID is missing']);
               }
         } else {
            echo json_encode(['message' => 'Invalid request method']);
         }
         break;


    case 'vrniOglas':
        if ($request_method === 'GET') {
            $oglasController = new OglasController();
            $oglasController->vrniOglas();
        } else {
            echo json_encode(['message' => 'Invalid request method']);
        }
        break;
    case 'dodajOglas':
        if ($request_method === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            $oglasController = new OglasController();
            $oglasController->dodajOglas($input);
        } else {
            echo json_encode(['message' => 'Invalid request method']);
        }
        break;
    case 'izbrisiOglas':
        if ($request_method === 'DELETE') {
            $input = json_decode(file_get_contents('php://input'), true);
            log_data($input['id_oglas']);
            if (isset($input['id_oglas'])) {
                $oglasController = new OglasController();
                $oglasController->izbrisiOglas($input['id_oglas']);
                echo json_encode(['status' => 'success', 'message' => 'Oglas izbrisan uspesno']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Oglas ID is missing']);
            }
        } else {
            echo json_encode(['message' => 'Invalid request method']);
        }
        break;

    case 'vrniKategorije':
        if ($request_method === 'GET') {
            $kategorijeController = new KategorijeController();
            $kategorijeController->vrniKategorije();
        } else {
            echo json_encode(['message' => 'Invalid request method']);
        }
        break;
      
        case 'dodajKategorijo':
         if ($request_method === 'POST') {
             $input = json_decode(file_get_contents('php://input'), true);
             $kategorijeController = new KategorijeController();
             $kategorijeController->dodajKategorijo($input);
         } else {
             echo json_encode(['message' => 'Invalid request method']);
         }
         break;


    case 'editOglas':
        if ($request_method === 'PUT') {
            $input = json_decode(file_get_contents('php://input'), true);
            $oglasController = new OglasController();
            $oglasController->editOglas($input);
        } else {
            echo json_encode(['message' => 'Invalid request method']);
        }
        break;
    default:
        echo json_encode(['message' => 'Invalid endpoint']);
        break;
}
?>
