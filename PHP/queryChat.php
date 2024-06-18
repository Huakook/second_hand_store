<?php
    header('Access-Control-Allow-Origin: http://localhost:3000'); 
    include './connect.php';
    $oid = $_GET['OID']; 
    try{
        $sql = 'select * from orders where OID = ' . $oid . ';';
        $query = $conn -> query( $sql ) ;
        $data = $query -> fetch( PDO::FETCH_ASSOC );
        $cusID = $data["CustomerID"]; 
        $vID = $data["VenderID"]; 
        
        $query = $conn -> query("select * from chat where CustomerID = " . $cusID . " and VenderID = " . $vID . ";" ); 
        $data = $query -> fetchAll( PDO::FETCH_ASSOC );
        if( $data != NULL ){
            echo json_encode( $data );
        }else{
            echo json_encode( array( 'result' => 0 ) ) ;
        }
    } catch(PDOException $e) {
        echo $e ; 
        echo json_encode( array("result" => 0 ) ); 
    }
    exit();
?>