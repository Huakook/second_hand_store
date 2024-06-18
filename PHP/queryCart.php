<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Content-Type: application/json');
    
    include './connect.php';
    $email = $_GET['email'];
    $query = $conn -> query("select * from account where account = '" . $email . "';" ) ;
    $aid = $query -> fetch( PDO::FETCH_ASSOC )['AID'] ; 

    $sql = 'select cart.CID , cart.price , cart.amount , product.PID , product.AID , product.name , product.image from cart join product on cart.PID = product.PID where cart.AID = ' . $aid . ' order by product.AID;';
    try{
        $query = $conn -> query( $sql ) ;
        $data = $query -> fetchAll( PDO::FETCH_OBJ );
        echo json_encode( $data ); 
    } catch(PDOException $e) {
        echo $e ; 
        echo json_encode( array("result" => $e ) ); 
    }
    exit();
?>