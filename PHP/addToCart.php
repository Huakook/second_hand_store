<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './connect.php';
    //$d = 3 ;
    try{
        $amount = $_GET['amountSelect'];
        $pid = $_GET['pid'];
        $email = $_GET['email'];
        $query = $conn -> query("select * from account where account = '" . $email . "';" ) ;
        $aid = $query -> fetch( PDO::FETCH_ASSOC )['AID'] ; 
        $query = $conn -> query("select * from product where PID = " . $pid . ";" );
        $price = $query -> fetch( PDO::FETCH_ASSOC )['price']; 
        
    

        //check if the product has been added 
        $sql = 'select * from cart where PID = ' . $pid . ' and AID = ' . $aid . ';';
        $query = $conn -> query( $sql );
        if( $query != NULL )
        {
            echo json_encode( array( 'result' => 2 ) ) ; 
            exit(); 
        }
        // if it has not been added, insert the new data 
        $sql = 'insert into cart values( null,' . $aid . ', ' . $pid . ', ' . $amount . ', ' . $price . ');'; 
        $query = $conn -> query( $sql ) ;
        $data = $query -> fetch( PDO::FETCH_OBJ );
        echo json_encode( array( 'result' => 1 ) ) ; 
    } catch(PDOException $e) {
        //echo $e ; 
        echo json_encode( array( 'result' => 0 ) ) ; 
    }

    exit();
?>