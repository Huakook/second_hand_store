<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './connect.php';
    //$d = 3 ;
    $oid = $_GET['oid'];
    try{
        $sql = 'select * from orders where OID = ' . $oid . ';';
        $query = $conn -> query( $sql ) ;
        $data = $query -> fetch( PDO::FETCH_ASSOC );
        $amount = $data["amount"]; 
        $pid = $data["PID"]; 
        if( $data["status"] == "requested" )
        {
            //set status to rejected 
            $sql = 'update orders set status = "rejected" where OID = ' . $oid . ';';
            $query = $conn -> query( $sql ) ;
            //if the order is rejected, then add the amount of products back 
            $sql = 'select * from product where PID = ' . $pid . ';'; 
            echo $sql; 
            $query = $conn -> query( $sql ); 
            $data = $query -> fetch( PDO::FETCH_ASSOC ); 
            $remaining = $data["amount"]; 
            echo $remaining; 
            echo $amount; 
            $sql = 'update product set amount = ' . $remaining + $amount . ' where PID = ' . $pid . ';' ; 
            $conn -> query($sql); 
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