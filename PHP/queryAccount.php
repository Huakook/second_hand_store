<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './connect.php';

    $sql = 'select * from account';
    try{
        $query = $conn -> query( $sql ) ;
        $data = $query -> fetchAll( PDO::FETCH_OBJ );
        echo json_encode( $data ); 
    } catch(PDOException $e) {
        //echo $e ; 
    }
    exit();
?>