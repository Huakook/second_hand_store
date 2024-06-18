
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
        $query = $conn -> query("select * from account where AID = " . $cusID . ";"); 
        $data = $query -> fetch( PDO::FETCH_ASSOC ); 
        $cusName = $data["name"]; 
        $cusPicture = $data["picture"]; 
        $query = $conn -> query("select * from account where AID = " . $vID . ";"); 
        $data = $query -> fetch( PDO::FETCH_ASSOC ); 
        $vName = $data["name"]; 
        $vPicture = $data["picture"]; 
        echo json_encode( array( 'cusName' => $cusName , 'cusPicture' => $cusPicture , 'vName' => $vName , 'vPicture' => $vPicture , 'result' => 1 )) ;
    } catch(PDOException $e) {
        echo $e ; 
        echo json_encode( array("result" => 0 ) ); 
    }
    exit();
?>