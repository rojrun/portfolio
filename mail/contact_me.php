<?php
// Check for empty fields
if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['phone']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  http_response_code(500);
  exit();
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$phone = phone_number_format(strip_tags(htmlspecialchars($_POST['phone'])));
$message = strip_tags(htmlspecialchars($_POST['message']));

function phone_number_format($number) {
  $length = strlen($number);
  if($length == 10) {
    $number = preg_replace("/^1?(\d{3})(\d{3})(\d{4})$/", "$1-$2-$3", $number);
  } 
  return $number;
}

// Create the email and send the message
$config = 'MIME-Version: 1.0';
$config .= 'Content-type: text/html; charset=iso-8859-1';
$to = "run_roj@hotmail.com"; // Add your email address inbetween the "" replacing yourname@yourdomain.com - This is where the form will send a message to.
$subject = "Website Contact Form:  $name";
$body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email\n\nPhone: $phone\n\nMessage:\n$message";
$header = "From: noreply@yourdomain.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$header .= "Reply-To: $email";	

if(!mail($to, $subject, $body, $header, $config)) {
  var_dump( error_get_last());
  var_dump($to);
  var_dump($subject);
  var_dump($body);
  var_dumP($header);
  var_dump($config);
  http_response_code(500);
}  
?>
