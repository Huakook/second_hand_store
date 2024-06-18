<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './connect.php';
    //$d = 3 ;
    $CID = $_POST["CID"]; 
    $VenderID = $_POST['VenderID'];
    $CustomerID = $_POST["CustomerID"]; 
    $sender = $_POST['sender']; 
    $message = $_POST['message'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $ID = $_POST['ID']; 

    $sql = "update chat set CID = " . $CID . " , VenderID = " . $VenderID . " , CustomerID = " . $CustomerID . " , sender = '"  . $sender . "' , message = '" . $message . "' , date = '" . $date . "' , time = '" . $time . "' where CID = " . $ID . ";" ;
    // echo $sql;
    try{
        $query = $conn -> query( $sql ) ; 
        $data = $query -> fetch( PDO::FETCH_ASSOC );

        echo json_encode( array( 'result' => 1 ) ) ; 
    } catch(PDOException $e) {
        //echo $e ; 
        echo json_encode( array( 'result' => 0 , 'msg' => $e ) ) ; 
    }

    exit();
?>