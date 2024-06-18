<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './connect.php';
    //$d = 3 ;
    
    $PID = $_POST["PID"]; 
    $name = $_POST['name'];
    $AID = $_POST["AID"]; 
    // var_dump( $_FILES );
    // $file = $_FILES["File"]["name"];
    // var_dump($_FILES);  
    $image = $_POST['image']; 
    $condition = $_POST['condition'];
    $price = $_POST['price'];
    $year = $_POST['year'];
    $amount = $_POST['amount'];
    $description = $_POST['description']; 
    $ID = $_POST['ID']; 

    $sql = "update product set PID = " . $PID . " , name = '" . $name . "' , AID = " . $AID . " , image = '"  . $image . "' , `condition` = '" . $condition . "' , price = " . $price . " , year = " . $year . ", amount = " . $amount . " , description = '" . $description . "' where PID = " . $ID . ";" ;
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