<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require '../vendor/autoload.php';
include '../config/email.php';

$mail = new PHPMailer();
try {
  // Check for empty fields
  if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(500);
    exit();
  }

  $name = strip_tags(htmlspecialchars($_POST['name']));
  $email = strip_tags(htmlspecialchars($_POST['email']));
  $phone = strip_tags(htmlspecialchars($_POST['phone']));
  $message = strip_tags(htmlspecialchars($_POST['message']));

  // Create the email and send the message
  $subject = "Website Contact Form: $name";
  $body = "<h2 style='color: red;'>You have received a new message from your website contact form.</h2><br><h3>Here are the details:</h3><br><h3 style='margin-top: 0; margin-bottom:0;'>Name: $name</h3><br><h3 style='margin-top: 0; margin-bottom:0;'>Email: $email</h3><br><h3 style=' margin-top: 0; margin-bottom:0;'>Phone: $phone</h3><br><h3 style='margin-top: 0; margin-bottom:0;'>Message: $message</h3>";
  
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
  $mail->AltBody = "You have received a new message from your website contact form.\r\n"."Here are the details:\r\nName: $name\r\nEmail: $email\r\nPhone: $phone\r\nMessage:\n$message";

  if (array_key_exists('uploaded_file', $_FILES)) {
    //Attach multiple files one by one
    for ($ct = 0; $ct < count($_FILES['uploaded_file']['tmp_name']); $ct++) {
      if (!isset($_FILES['uploaded_file']['error'][$ct])) {
        throw new RuntimeException('There is something wrong with one of your files.');
      }
      switch ($_FILES['uploaded_file']['error'][$ct]) {
        case UPLOAD_ERR_OK:
          break;
        case UPLOAD_ERR_NO_FILE:
          throw new RuntimeException('One of your files appears not to have been sent.');
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
          throw new RuntimeException('One of your files appear to be too big.');
        default:
          throw new RuntimeException('Unknown errors occured.');
      }

      $tempfilename = $_FILES['uploaded_file']['tmp_name'][$ct];
      $uniquename = tempnam(sys_get_temp_dir(), hash('sha256', $_FILES['uploaded_file']['name'][$ct]));
      $filename = $_FILES['uploaded_file']['name'][$ct];
      if (move_uploaded_file($tempfilename, $uniquename)) {
        $mail->addAttachment($uniquename, $filename);         
      } else {
          echo 'Failed to move file to ' . $uniquename;
      }
    }
  }

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
