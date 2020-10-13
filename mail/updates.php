<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require '../vendor/autoload.php';
include '../config/email.php';

$mail = new PHPMailer();
try {
  // Check for empty fields
  if(empty($_POST['name']) || empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(500);
    exit();
  }

  $name = strip_tags(htmlspecialchars($_POST['name']));
  $email = strip_tags(htmlspecialchars($_POST['email']));
  $interests = implode(', ', $_POST['interest']);
  
  // Create the email and send the message
  $to = $secret_email; // Add your email address inbetween the "" replacing yourname@yourdomain.com - This is where the form will send a message to.
  $subject = "Website Updates Form: $name";
  $body = "<h2>You have received a new interest from your website updates form.</h2><br><h3 style='color: blue;'>Here are the details:</h3><br><h3 style='margin-top: 0; margin-bottom:0;'>Name: $name</h3><br><h3 style='margin-top: 0; margin-bottom:0;'>Email: $email</h3><br><h3 style='margin-top: 0; margin-bottom:0;'>Interests: $interests</h3>";
  $header = "From: noreply@yourdomain.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
  $header .= "Reply-To: $email";
  
  $mail->isSMTP();
  $mail->SMTPSecure = 'ssl';
  $mail->SMTPDebug = SMTP::DEBUG_SERVER;
  $mail->Host = 'smtp.gmail.com';
  $mail->Port = 465;
  $mail->SMTPAuth = true;
  $mail->isHTML(true);
  $mail->Username = $secret_email;
  $mail->Password = $secret_password;
  $mail->CharSet = PHPMailer::CHARSET_UTF8;
  $mail->setFrom($email, $name);
  $mail->addAddress($to, $email_to);
  $mail->Subject = $subject;
  $mail->addReplyTo($email, $name);
  $mail->Body = $body;
  $mail->AltBody = "You have received a new interest from your website updates form.\r\n"."Here are the details:\r\nName: $name\r\nInterests: $interests";
  if($mail->send()) {
    echo 'message sent';
    exit();
  } else {
    echo 'did not work';
    exit();
  }
} catch(RuntimeException $e) {
  echo $e->getMessage();
} catch(\Exception $e) {
  echo $e->errorMessage();  
}
?>