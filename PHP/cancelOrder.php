<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './connect.php';
    //$d = 3 ;
    $oid = $_GET['oid'];
    try{
        $sql = 'select * from orders where OID = ' . $oid . ';';
        $query = $conn -> query( $sql ) ;
        $data = $query -> fetch( PDO::FETCH_ASSOC );
        if( $data["status"] == "requested" || $data["status"] == "rejected" )
        {
            $sql = 'delete from orders where OID = ' . $oid . ';';
            $query = $conn -> query( $sql ) ;
            $data = $query -> fetch( PDO::FETCH_OBJ );
            echo json_encode( array( "result" => 1 ) ); 
        }else{
            echo json_encode( array( "result" => 0 ) ); 
        }
    } catch(PDOException $e) {
        //echo $e ; 
        echo json_encode( array( "result" => 0 ) ); 
    }
    exit();
?>