<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\SMTP;
  use PHPMailer\PHPMailer\Exception;
  require '../vendor/autoload.php';
  include '../config/email.php';
  
  $mail = new PHPMailer(true);
  try {
    if (empty($_POST['full_name']) || empty($_POST['email_address']) || !filter_var($_POST['email_address'], FILTER_VALIDATE_EMAIL)) {
      http_response_code(500);
      exit();
    }

    $project_name = strip_tags(htmlspecialchars($_POST['project_name']));
    $project_details = strip_tags(htmlspecialchars($_POST['project_details']));
    $technique_type = strip_tags(htmlspecialchars($_POST['techniqueType']));
    $page = implode(', ', $_POST['page']);
    $page_count = strip_tags(htmlspecialchars($_POST['pageCount']));
    $price_per_page = number_format(strip_tags(htmlspecialchars($_POST['pricePerPage'])));
    $page_subtotal = number_format(strip_tags(htmlspecialchars($_POST['pageSubtotal'])));
    $feature = implode(', ', $_POST['feature']);
    $feature_count = strip_tags(htmlspecialchars($_POST['featureCount']));
    $price_per_feature = number_format(strip_tags(htmlspecialchars($_POST['pricePerFeature'])));
    $feature_subtotal = number_format(strip_tags(htmlspecialchars($_POST['featureSubtotal'])));
    $estimate_total = number_format(strip_tags(htmlspecialchars($_POST['estimateTotal'])));
    $full_name = strip_tags(htmlspecialchars($_POST['full_name']));
    $first_name = explode(' ', trim($full_name))[0];
    $email = strip_tags(htmlspecialchars($_POST['email_address']));
    $phone = strip_tags(htmlspecialchars($_POST['phone_number']));
   
    // Create the email and send the message
    $subject = "A build quote for $project_name";
    $body = "
      <h1>$first_name, here is the build quote you requested for your project.</h1><br>
      <p style='margin: 0'>$full_name</p>
      <p style='margin: 0'>$email</p>
      <p style='margin: 0'>$phone</p>
      <p style='margin: 0'>$project_details</p>
      <p>Technique type: $technique_type</p>
      <table width='100%'>
        <colgroup>
          <col style='width: 75%'>
        </colgroup>
        <tr>
          <td>Pages you selected to add to your project:</td>
          <td></td>
        </tr>
        <tr>
          <td>$page</td>
          <td></td>
        </tr>
        <tr>
          <td>$page_count x $$price_per_page per page</td>
          <td>$$page_subtotal</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>Features you selected to add to your project:</td>
          <td></td>
        </tr>
        <tr>
          <td>$feature</td>
          <td></td>
        </tr>
        <tr>
          <td>$feature_count x $$price_per_feature per feature</td>
          <td>$$feature_subtotal</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>Estimate total</td>
          <td>$$estimate_total</td>
        </tr>
      </table>
      <h3>Thank you for inquiring about web development pricing for your project.</h3>
      <h4 style='margin: 0'>Sincerely,</h4>
      <h4 style='margin: 0'>Roj Rungsisullatanont</h4>
      <h4 style='margin: 0'><a href='https://rojrundev.com/'>rojrundev.com</a></h4>
      <h4 style='margin: 0'><a href='mailto:runroj@gmail.com'>runroj@gmail.com</a></h4>
      <h4 style='margin: 0'><a href='tel:17147137511'>714.713.7511</a></h4>
    ";
    
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
    $mail->setFrom($secret_email, $email_to);
    $mail->addAddress($email, $full_name);
    $mail->addReplyTo($secret_email, $email_to);
    $mail->addBCC($secret_email);
    $mail->From = $email;
    $mail->FromName = $full_name;
    $mail->Subject = $subject;
    $mail->Body = $body;
    
    if($mail->Send()) {
      echo 'message sent';
      exit();
    } else {
      echo 'message did not send';
      exit();
    }
    
  } catch(Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
  }
?>
