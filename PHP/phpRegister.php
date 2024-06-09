<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    
    //phpinfo();
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "C:\Users\user\Desktop\Lectures\\3-2 Lectures\DBMS\Term Project\second-hand-store\PHPMailer-master\src\Exception.php";
    require "C:\Users\user\Desktop\Lectures\\3-2 Lectures\DBMS\Term Project\second-hand-store\PHPMailer-master\src\PHPMailer.php";
    require "C:\Users\user\Desktop\Lectures\\3-2 Lectures\DBMS\Term Project\second-hand-store\PHPMailer-master\src\SMTP.php";

    $email = $_POST['Email'] ;

    //generate the random string
    $verification_code = '' ; 
    $str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    for( $i = 0 ; $i < 6 ; $i++ )
    {
        $j = rand( 0 , 62 ) ; 
        $verification_code = $verification_code . $str[ $j ] ; 
    }

    set_time_limit( 60 );
    ini_set('max_execution_time', '300');
    $mail = new PHPMailer( true ) ; 
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'yvette030717@gmail.com';
    $mail->Password = getenv('SMTP');
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->setFrom('yvette030717@gmail.com');
    $mail->addAddress($email);
    $mail->isHTML(true);
    $mail->Subject = 'Register Verification Code in NDHU second-hand store' ;
    $mail->Body = 'Your Verification Code is ' . $verification_code;
    $mail->send() ;
    $mail->smtpClose();
    putenv('SMTP=cwmlsiwqmtqwdnml');
    $result = 1 ;
    //$result = mail( $email , 'Register Verification Code in NDHU second-hand store' , 'Your Verification Code is' . $verification_code );//, header , parameters... 
    $_POST[$email] = $verification_code;
    //echo json_encode( array("code:"=> $verification_code , "res:" => $result , "SMTP"=> getenv('SMTP') ) ) ;
?>