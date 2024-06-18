<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './connect.php';
    //$d = 3 ;
    
    $OID = $_POST["OID"]; 
    $VenderID = $_POST['VenderID'];
    $CustomerID = $_POST["CustomerID"]; 
    $PID = $_POST['PID']; 
    $amount = $_POST['amount'];
    $price = $_POST['price'];
    $date = $_POST['date'];
    $status = $_POST['status'];
    $ID = $_POST['ID']; 

    $sql = "update orders set OID = " . $OID . " , VenderID = " . $VenderID . " , CustomerID = " . $CustomerID . " , PID = "  . $PID . " , amount = " . $amount . " , price = " . $price . " , date = '" . $date . "' , status = '" . $status . "' where OID = " . $ID . ";" ;
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