<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './connect.php';
    //$d = 3 ;
    $id = $_GET['id'];
    $sql = 'select * from product where AID = ' . $id . ';';
    try{
        $query = $conn -> query( $sql ) ;
        $data = $query -> fetch( PDO::FETCH_OBJ );
        echo json_encode( $data ); 
    } catch(PDOException $e) {
        //echo $e ; 
    }

    exit();
?>