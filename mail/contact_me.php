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
  $to = $secret_email; // Add your email address inbetween the "" replacing yourname@yourdomain.com - This is where the form will send a message to.
  $subject = "Website Contact Form: $name";
  $body = "<h2>You have received a new message from your website contact form.</h2><br>"."<h3>Here are the details:</h3><br><h3>Name: $name</h3><br><h3>Email: $email</h3><br><h3>Phone: $phone</h3><br><h3>Message: $message</h3>";
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
  $mail->addAddress($to, 'Roj Rungsisullatanont');
  $mail->Subject = $subject;
  $mail->addReplyTo($email, $name);
  // if(!file_exists($_FILES['uploaded_file']['name']) || !is_uploaded_file($_FILES['uploaded_file']['name'])) {
  //   echo 'No upload';
  // } else {
  //   for ($ct = 0; $ct < count($_FILES['uploaded_file']['tmp_name']); $ct++) {
  //     $uploadfile = tempnam(sys_get_temp_dir(), hash('sha256', $_FILES['uploaded_file']['name'][$ct]));
  //     $filename = $_FILES['uploaded_file']['name'][$ct];
  //     if (move_uploaded_file($_FILES['uploaded_file']['tmp_name'][$ct], $uploadfile)) {
  //         $mail->addAttachment(file_get_contents($uploadfile), $filename);
  //         echo 'Files uploaded';
  //     } else {
  //         echo 'Failed to move file to ' . $uploadfile;
  //     }
  //   }
  // }  
  $uploadfile = tempnam(sys_get_temp_dir(), hash('sha256', $_FILES['uploaded_file']['name']));
    $filename = $_FILES['uploaded_file']['name'];
    if (move_uploaded_file($_FILES['uploaded_file']['tmp_name'], $uploadfile)) {
        $mail->addAttachment($uploadfile, $filename);
    } else {
        echo 'Failed to move file to ' . $uploadfile;
    }
  // if (isset($_FILES['uploaded_file']) && $_FILES['uploaded_file']['error'] == UPLOAD_ERR_OK) {
  //   $mail->addAttachment($_FILES['uploaded_file']['tmp_name'], $_FILES['uploaded_file']['name']);
  // }
  $mail->Body = $body;
  $mail->AltBody = "You have received a new message from your website contact form.\r\n"."Here are the details:\r\nName: $name\r\nEmail: $email\r\nPhone: $phone\r\nMessage:\n$message";
  // $mail->msgHTML($body); 

  if($mail->send()) {
    echo 'message sent';
    exit();
  } else {
    echo 'did not work';
    exit();
  }
} catch(Exception $e) {
    echo $e->errorMessage();
} catch(\Exception $e) {
    echo $e->getMessage();
}
?>
