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
  $subject = "Website Updates Form: $name";
  $body = "<h2  style='color: blue;'>You have received a new interest from your website updates form.</h2><br><h3>Here are the details:</h3><br><h3 style='margin-top: 0; margin-bottom:0;'>Name: $name</h3><br><h3 style='margin-top: 0; margin-bottom:0;'>Email: $email</h3><br><h3 style='margin-top: 0; margin-bottom:0;'>Interests: $interests</h3>";
  
  $mail->IsSMTP();
  $mail->SMTPSecure = 'ssl';
  $mail->SMTPDebug = SMTP::DEBUG_SERVER;
  $mail->Host = 'smtp.gmail.com';
  $mail->Port = 465;
  $mail->SMTPAuth = true;
  $mail->IsHTML(true);
  $mail->Username = $secret_email;
  $mail->Password = $secret_password;
  $mail->CharSet = PHPMailer::CHARSET_UTF8;
  $mail->SetFrom($email, $name);
  $mail->AddAddress($secret_email, $email_to);
  $mail->From = $email;
  $mail->FromName = $name;
  $mail->Subject = $subject;
  $mail->AddReplyTo($email, $name);
  $mail->Body = $body;
  $mail->AltBody = "You have received a new interest from your website updates form.\r\n"."Here are the details:\r\nName: $name\r\nInterests: $interests";
  if($mail->Send()) {
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