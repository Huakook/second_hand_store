<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './connect.php';
    //$d = 3 ;
    $pid = $_GET['pid'];
    $sql = 'delete from product where PID = ' . $pid . ';';
    try{
        $query = $conn -> query( $sql ) ;
        $data = $query -> fetch( PDO::FETCH_OBJ );
        echo json_encode( array( "result" => 1 ) ); 
    } catch(PDOException $e) {
        //echo $e ; 
        echo json_encode( array( "result" => 0 ) ); 
    }
    exit();
?>