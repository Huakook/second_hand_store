<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './connect.php';
    $CID = $_POST["CID"]; 
    $AID = $_POST["AID"];
    $PID = $_POST["PID"]; 
    $amount = $_POST["amount"]; 
    $price = $_POST['price'];
    $ID = $_POST["ID"]; 

    $sql = "update cart set CID = " . $CID . " , AID = " . $AID . " , PID = " . $PID . " , amount = "  . $amount ." , price = " . $price . " where CID = " . $ID . ";" ;
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