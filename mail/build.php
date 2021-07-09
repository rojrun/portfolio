<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\SMTP;
  use PHPMailer\PHPMailer\Exception;
  require '../vendor/autoload.php';
  include '../config/email.php';
  
  $mail = new PHPMailer();
  try {
    if (empty($_POST['full_name']) || empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
      http_response_code(500);
      exit();
    }

    $project = strip_tags(htmlspecialchars($_POST['project_name']));
    // $service_type = strip_tags(htmlspecialchars($_POST['serviceType']));
    // $website_type = strip_tags(htmlspecialchars($_POST['websiteType']));
    // $technique_type = strip_tags(htmlspecialchars($_POST['techniqueType']));
    // $page = implode(',', $_POST['page']);
    // $page_count = strip_tags(htmlspecialchars($_POST['pageCount']));
    // $functionality = implode(',', $_POST['functionality']);
    // $functionality_count = strip_tags(htmlspecialchars($_POST['functionalityCount']));
    // $message = strip_tags(htmlspecialchars($_POST['message']));
    // $full_name = strip_tags(htmlspecialchars($_POST['full_name']));
    // $email = strip_tags(htmlspecialchars($_POST['email_address']));
    // $phone = strip_tags(htmlspecialchars($_POST['phone_number']));
    // $website_type_base_price = strip_tags(htmlspecialchars($_POST['websiteTypeBasePrice']));
    // $price_per_page = strip_tags(htmlspecialchars($_POST['pricePerPage']));
    // $page_subtotal = strip_tags(htmlspecialchars($_POST['pageSubTotal']));
    // $price_per_functionality = strip_tags(htmlspecialchars($_POST['pricePerFunctionality']));
    // $functionality_subtotal = strip_tags(htmlspecialchars($_POST['functionalitySubTotal']));
    // $estimate_total = strip_tags(htmlspecialchars($_POST['estimateTotal']));
    
    // Create the email and send the message
    $subject = "A Quote for $project";
    // $body = "
    //   <h1>$full_name, here is the quote you requested for your project.</h1><br>
    //   <h2>Website type: $website_type</h2><br>
    //   <h2>Technique type: $technique_type</h2><br>

    //   <div class='row'>
    //     <div class='col-9'>Pages you selected to add to your project:</div>
    //     <div class='col-3'></div>
    //   </div>
    //   <div class='row'>
    //     <div class='col-9'>$page</div>
    //     <div class='col-3'></div>
    //   </div>
    //   <div class='row'>
    //     <div class='col-9'>$page_count x $$price_per_page</div>
    //     <div class='col-3'>$$page_subtotal</div>
    //   </div>

    //   <div class='row>
    //     <div class='col-9'>Functionalities you selected to add to your project:</div>
    //     <div class='col-3'></div>
    //   </div>
    //   <div class='row>
    //     <div class='col-9'>$functionality</div>
    //     <div class='col-3'></div>
    //   </div>
    //   <div class='row'>
    //     <div class='col-9'>$functionality_count x $$price_per_functionality</div>
    //     <div class='col-3'>$$functionality_subtotal</div>
    //   </div>
      
    //   <div class='row'>
    //     <div class='col-9'>Estimate total</div>
    //     <div class='col-3'>$$estimate_total</div>
    //   </div> 
  

    //   <h2>Thank you for inquiring about web development pricing for your project.</h2><br><br>
    //   <h3>Sincerely,</h3><br>
    //   <h3>Roj Rungsisullatanont</h3><br>
    //   <h3><a href='https://rojrundev.com/'>rojrundev.com</a></h3><br>
    //   <h3><a href='mailto:runroj@gmail.com'>runroj@gmail.com</a></h3><br>
    //   <h3><a href='tel:17147137511'>714.713.7511</a></h3><br>
    // ";
    $body = "<h1>hi world</h1>";

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
    $mail->SetFrom($email, $full_name);
    $mail->AddAddress($secret_email, $email_to);
    $mail->From = $email;
    $mail->FromName = $full_name;
    $mail->Subject = $subject;
    $mail->AddReplyTo($email, $full_name);
    $mail->Body = $body;
    
    if($mail->Send()) {
      echo 'message sent';
      exit();
    } else {
      echo 'message did not send';
      exit();
    }
    
  } catch(RuntimeException $e) {
    echo $e->getMessage();
  } catch(\Exception $e) {
    echo $e->errorMessage();  
  }
?>
