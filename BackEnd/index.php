<?php
require __DIR__ . '/vendor/autoload.php'; // PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

$mail->SMTPDebug = 3;
$mail->Debugoutput = function ($str, $level) {
file_put_contents('phpmailer_debug.log', "Debug level [$level]: $str" . PHP_EOL, FILE_APPEND);
};

$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'kodric558@gmail.com';
$mail->Password = 'nrgm yvcc gddy ugwp';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
$mail->SMTPOptions = [
   'ssl' => [
       'verify_peer' => false,
       'verify_peer_name' => false,
       'allow_self_signed' => true,
   ],
];


$mail->setFrom('kodric558@gmail.com', 'Aljaz');
$mail->addAddress('aljaz.kodric03@gmail.com');

$mail->isHTML(true);
$mail->Subject = 'Test Email';
$mail->Body = 'This is a test email.';

try {
    $mail->send();
    echo "Email sent successfully.";
} catch (Exception $e) {
    echo "Mailer Error: " . $mail->ErrorInfo;
}

?>