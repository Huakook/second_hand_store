<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    
    include './connect.php';
    try{
        $email = $_GET['email'];
        $query = $conn -> query("select * from account where account = '" . $email . "';" ) ;
        $aid = $query -> fetch( PDO::FETCH_ASSOC )['AID'] ; 

        $sql = 'select orders.OID , orders.VenderID , orders.CustomerID , orders.PID , orders.amount , orders.price , orders.date , orders.status , product.name , product.image from orders join product on orders.PID = product.PID where VenderID = ' . $aid . ' ORDER BY date desc , orders.CustomerID;
        ;';
        $query = $conn -> query( $sql ) ;
        $data = $query -> fetchAll( PDO::FETCH_OBJ );
        echo json_encode( $data ); 
    } catch(PDOException $e) {
        echo $e ; 
        echo json_encode( array("result" => 0 ) ); 
    }

    exit();
?>