<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
require '../vendor/autoload.php';
$mail = new PHPMailer;
$mail->isSMTP();
$mail->SMTPDebug = SMTP::DEBUG_SERVER;
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->SMTPAuth = true;
$mail->Username = $secret_email;
$mail->Password = $secret_password;

// Check for empty fields
if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['phone']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  http_response_code(500);
  exit();
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$phone = $_POST['phone'];
$message = strip_tags(htmlspecialchars($_POST['message']));

// Create the email and send the message
$to = 'runroj@gmail.com'; // Add your email address inbetween the "" replacing yourname@yourdomain.com - This is where the form will send a message to.
$subject = "Website Contact Form:  $name";
$body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email\n\nPhone: $phone\n\nMessage:\n$message";
$header = "From: noreply@yourdomain.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$header .= "Reply-To: $email";	

$mail->setFrom($email, $name);
$mail->addAddress($secret_email, 'Roj Rungsisullatanont');
$mail->Subject = $subject;
// $mail->addAttachment('images/phpmailer_mini.png');

if(!mail($to, $subject, $body, $header)) {
  var_dump( error_get_last());
  var_dump($to);
  echo var_dump($subject);
  echo var_dump($body);
  echo var_dumP($header);
  http_response_code(500);
}  
?>
