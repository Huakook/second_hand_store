<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './connect.php';
    //$d = 3 ;
    try{
        $name = $_GET['UserName'];
        $password = $_GET['Password'];
        $hash = password_hash( $password , PASSWORD_DEFAULT ); 
        $img = $_GET['selectImg']; 
        $email = $_GET['email']; 
        $sql = "update account set name = '" . $name . "', hash = '" . $hash . "' , picture = '" . $img . "' where account = '" . $email . "';" ;

        $query = $conn -> query( $sql ) ;
        echo json_encode( array( 'result' => 1 , 'selectImg' => $img , 'name' => $name ) ) ; 
    } catch(PDOException $e) {
        //echo $e ; 
        echo json_encode( array( 'result' => 0 ) ) ; 
    }

    exit();
?>