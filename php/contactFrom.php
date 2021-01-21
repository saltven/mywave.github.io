<?php
$errorMSG = "";
$captcha_error = "";

if (empty($_POST["name"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["name"];
}

if (empty($_POST["email"])) {
    $errorMSG = "Email is required ";
} else {
    $email = $_POST["email"];
}

if (empty($_POST["message"])) {
    $errorMSG = "Message is required ";
} else {
    $message = $_POST["message"];
}


$EmailTo = "ammarhazrinn@gmail.com";
$Subject = "MyWAVe inquiry from";

// prepare email body text
$Body = "Hi Shotbook,\n\nI would like to be included in your awesome ecosystem, my details as follow:\n\n";
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n\n";
$Body .= "Message: ";
$Body .= $message;

// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}
?>