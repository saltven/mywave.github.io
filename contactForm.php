<?php
// use PHPMailer\PHPMailer\PHPMailer;

// if(isset($_POST['name']) && isset($_POST['email'])){
//     $name = $_POST['name'];
//     $email = $_POST['email'];
//     $subject = "This is a subject";
//     $body = $_POST['body'];
    
//     require_once "PHPMailer/PHPMailer.php";
//     require_once "PHPMailer/SMTP.php";
//     require_once "PHPMailer/Exception.php";

//     $mail = new PHPMailer();

//     $mail->isSMTP();
//     $mail->Host = "smtp.gmail.com";
//     $mail->SMTPAuth = true;
//     $mail->Username = "biz.merfy@gmail.com";
//     $mail->Password = 'yasin123';
//     $mail->Port = 465;
//     $mail->SMTPSecure = "ssl";

//     $mail->isHTML(true);
//     $mail->setFrom($email, $name);
//     $mail->addAddress("biz.merfy@gmail.com");
//     $mail->Subject = ("$email ($subject)");
//     $mail->Body = $body;

//     if($mail->send()){
//         $status = "success";
//         $response = "Email is sent!";
//     }
//     else {
//         $status = "failed";
//         $response = "Something went wrong: <br>" . $mail->ErrorInfo;
//     }
//     exit(json_encode(array("status" => $status, "response" => $response)));
// }





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

if (empty($_POST["body"])) {
    $errorMSG = "Message is required ";
} else {
    $message = $_POST["body"];
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