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
  $body = "<h2>You have received a new message from your website contact form.</h2><br><h3>Here are the details:</h3><br><h3 class=\"mb-0\">Name: $name</h3><br><h3 class=\"mb-0\">Email: $email</h3><br><h3 class=\"mb-0\">Phone: $phone</h3><br><h3 class=\"mb-0\">Message: $message</h3>";
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
//   if (array_key_exists('uploaded_file', $_FILES)) {
//     //Attach multiple files one by one
//     for ($ct = 0; $ct < count($_FILES['uploaded_file']['tmp_name']); $ct++) {
//         if ($ct == $maximumfiles) {
//             throw new Exception('You uploaded too many files.');
//         }
//         if (!isset($_FILES['uploaded_file']['error'][$ct])) {
//             throw new Exception('There is something wrong with one of your files.');
//         }
//         switch ($_FILES['uploaded_file']['error'][$ct]) {
//             case UPLOAD_ERR_OK:
//                 break;
//             case UPLOAD_ERR_NO_FILE:
//                 throw new Exception('One of your files appears not to have been sent.');
//             case UPLOAD_ERR_INI_SIZE:
//             case UPLOAD_ERR_FORM_SIZE:
//                 throw new Exception('One of your files appear to be too big.');
//             default:
//                 throw new Exception('Unknown errors occured.');
//         }
//         if ($_FILES['uploaded_file']['size'][$ct] > 1000000) {
//             throw new Exception('Exceeded filesize limit.');
//         }
//         if (false === $ext = array_search(
//             $finfo->file($_FILES['uploaded_file']['tmp_name'][$ct]),
//             array(
//                 'jpg' => 'image/jpeg',
//                 'png' => 'image/png',
//                 'gif' => 'image/gif',
//             ),
//             true
//         )) {
//             throw new Exception('Invalid file format.');
//         }


//         $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['uploaded_file']['name'][$ct]));
//         $filename = $_FILES['uploaded_file']['name'][$ct];
//         if (move_uploaded_file($_FILES['uploaded_file']['tmp_name'][$ct], $uploadfile)) {
//             $mail->addAttachment($uploadfile, $filename);
//         } else {
//             // $body .= 'Failed to move file to ' . $uploadfile;
//             echo 'Failed to move file to ' . $uploadfile;
//         }
//     }
// }

  if(!file_exists($_FILES['uploaded_file']['name']) || !is_uploaded_file($_FILES['uploaded_file']['name'])) {
    echo 'No upload';
  } else {
    for ($ct = 0; $ct < count($_FILES['uploaded_file']['tmp_name']); $ct++) {
      $uploadfile = tempnam(sys_get_temp_dir(), hash('sha256', $_FILES['uploaded_file']['name'][$ct]));
      $filename = $_FILES['uploaded_file']['name'][$ct];
      if (move_uploaded_file($_FILES['uploaded_file']['tmp_name'][$ct], $uploadfile)) {
          $mail->addAttachment(file_get_contents($uploadfile), $filename);
          echo 'Files uploaded';
      } else {
          echo 'Failed to move file to ' . $uploadfile;
      }
    }
  }  
  // $uploadfile = tempnam(sys_get_temp_dir(), hash('sha256', $_FILES['uploaded_file']['name']));
  //   $filename = $_FILES['uploaded_file']['name'];
  //   if (move_uploaded_file($_FILES['uploaded_file']['tmp_name'], $uploadfile)) {
  //       $mail->addAttachment($uploadfile, $filename);
  //   } else {
  //       echo 'Failed to move file to ' . $uploadfile;
  //   }
  // if (isset($_FILES['uploaded_file']) && $_FILES['uploaded_file']['error'] == UPLOAD_ERR_OK) {
  //   $mail->addAttachment($_FILES['uploaded_file']['tmp_name'], $_FILES['uploaded_file']['name']);
  // }
  $mail->Body = $body;
  $mail->AltBody = "You have received a new message from your website contact form.\r\n"."Here are the details:\r\nName: $name\r\nEmail: $email\r\nPhone: $phone\r\nMessage:\n$message";
  
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
