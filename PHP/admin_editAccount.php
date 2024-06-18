<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './connect.php';
    $AID = $_POST["AID"]; 
    $name = $_POST["name"];
    $account = $_POST["account"]; 
    $hash = $_POST["hash"]; 
    $picture = $_POST['picture'];
    $ID = $_POST["ID"]; 

    $sql = "update account set AID = " . $AID . " , name = '" . $name . "' , account = '" . $account . "' , hash = '"  . $hash ."' , picture = '" . $picture . "' where AID = " . $ID . ";" ;
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