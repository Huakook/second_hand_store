<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './connect.php';
    //$d = 3 ;
    $email = $_GET['email'];
    $sql = 'select * from account where account = "' . $email . '";';
    try{
        $query = $conn -> query( $sql ) ;
        $data = $query -> fetch( PDO::FETCH_ASSOC );
        $aid = $data["AID"]; 
        echo json_encode( array( "AID" => $aid ) );  
    } catch(PDOException $e) {
        //echo $e ; 
    }

    exit();
?>