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

    $project = strip_tags(htmlspecialchars($_POST['project_name']));
    $service_type = strip_tags(htmlspecialchars($_POST['serviceType']));
    $website_type_text = strip_tags(htmlspecialchars($_POST['websiteTypeText']));
    $technique_type = strip_tags(htmlspecialchars($_POST['techniqueType']));
    $page = implode(', ', $_POST['page']);
    $page_count = strip_tags(htmlspecialchars($_POST['pageCount']));
    $functionality = implode(', ', $_POST['functionality']);
    $functionality_count = strip_tags(htmlspecialchars($_POST['functionalityCount']));
    $message = strip_tags(htmlspecialchars($_POST['message']));
    $full_name = strip_tags(htmlspecialchars($_POST['full_name']));
    $first_name = explode(' ', trim($full_name))[0];
    $email = strip_tags(htmlspecialchars($_POST['email_address']));
    $phone = strip_tags(htmlspecialchars($_POST['phone_number']));
    $website_type_base_price = number_format(strip_tags(htmlspecialchars($_POST['websiteTypeBasePrice'])));
    $price_per_page = number_format(strip_tags(htmlspecialchars($_POST['pricePerPage'])));
    $page_subtotal = number_format(strip_tags(htmlspecialchars($_POST['pageSubtotal'])));
    $price_per_functionality = number_format(strip_tags(htmlspecialchars($_POST['pricePerFunctionality'])));
    $functionality_subtotal = number_format(strip_tags(htmlspecialchars($_POST['functionalitySubtotal'])));
    $estimate_total = number_format(strip_tags(htmlspecialchars($_POST['estimateTotal'])));
    
    // Create the email and send the message
    $subject = "A build quote for $project";
    $body = "
      <h1>$first_name, here is the build quote you requested for your project.</h1><br>
      <p style='margin: 0'>$full_name</p>
      <p style='margin: 0'>$email</p>
      <p style='margin: 0'>$phone</p>
      <p style='margin: 0'>$message</p>
      <p>Technique type: $technique_type</p>
      <table width='100%'>
        <colgroup>
          <col style='width: 75%'>
        </colgroup>
        <tr>
          <td>$website_type_text</td>
          <td></td>
        </tr>
        <tr>
          <td>Base price</td>
          <td>$$website_type_base_price</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
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
          <td>Functionalities you selected to add to your project:</td>
          <td></td>
        </tr>
        <tr>
          <td>$functionality</td>
          <td></td>
        </tr>
        <tr>
          <td>$functionality_count x $$price_per_functionality per function</td>
          <td>$$functionality_subtotal</td>
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
    // header("Set-Cookie: cross-site-cookie=whatever; SameSite=None; Secure");
    
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
