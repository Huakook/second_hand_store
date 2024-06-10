<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    //phpinfo();
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "C:\Users\user\Desktop\Lectures\\3-2 Lectures\DBMS\Term Project\second-hand-store\PHPMailer-master\src\Exception.php";
    require "C:\Users\user\Desktop\Lectures\\3-2 Lectures\DBMS\Term Project\second-hand-store\PHPMailer-master\src\PHPMailer.php";
    require "C:\Users\user\Desktop\Lectures\\3-2 Lectures\DBMS\Term Project\second-hand-store\PHPMailer-master\src\SMTP.php";

    //check if the user is registered or not
    include './connect.php';
    $sql = "select account from Account where account = " . "'" . $_POST['Email'] . "'";
    $query = $conn -> query( $sql );
    $data = $query -> fetchAll( PDO::FETCH_ASSOC ) ; 
    if( $data != NULL )
    {
        echo json_encode( array('result' => false ) );
        exit(0);
    }

    /*
    session_start();
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    session_destroy() ; */

    //generate the random string
    $verification_code = '' ; 
    $str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    for( $i = 0 ; $i < 6 ; $i++ )
    {
        $j = rand( 0 , 62 ) ; 
        $verification_code = $verification_code . $str[ $j ] ; 
    }

    //echo json_encode( array( "email" => $_POST['Email'] , "SE" => $_SESSION['Email'] ) );
    //exit(0);

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
    $mail->addAddress($_POST['Email']);
    $mail->isHTML(true);
    $mail->Subject = 'Register Verification Code in NDHU second-hand store' ;
    $mail->Body = 'Your Verification Code is ' . $verification_code;
    $mail->send() ;
    $mail->smtpClose();
    //putenv('SMTP=');
    $result = 1 ;
    //$result = mail( $email , 'Register Verification Code in NDHU second-hand store' , 'Your Verification Code is' . $verification_code );//, header , parameters... 
    
    $_SESSION['code'] = $verification_code;
    echo json_encode( array( "Email" => $_POST['Email'] , "Name" => $_POST['Name'] , "Password" => $_POST['Password'] , "Picture" => $_POST['Picture'] , "Code" => $_SESSION['code'] , "result" => true ) );
    //echo json_encode( array("code"=> $verification_code , "res" => $result , "SMTP"=> getenv('SMTP') ) ) ;
?>