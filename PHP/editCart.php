<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './connect.php';
    //$d = 3 ;
    try{
        $pid = $_GET['pid'];
        $amount = $_GET['amountSelect'];
        $email = $_GET['email'];
        $query = $conn -> query("select * from account where account = '" . $email . "';" ) ;
        $aid = $query -> fetch( PDO::FETCH_ASSOC )['AID'] ; 

        // check if the remaining amount is less than the current amount and the product has not been deleted ! 
        $query = $conn -> query("select * from product where PID = " . $pid . ";" );
        $data = $query -> fetch( PDO::FETCH_ASSOC );
        if( $data == NULL ) 
        {
            echo json_encode( array( 'result' => 2 ) ) ;//the product has been deleted 
            exit();
        }
        $remaining = $data['amount']; 
        if( $remaining < $amount )
        {
            echo json_encode( array( 'result' => 3 ) ) ;//the remaining amount is less than the current amount
            exit();
        }
        $sql = 'update cart set amount=' . $amount . ' where PID = ' . $pid . ' and AID = ' . $aid .  ';';

        $query = $conn -> query( $sql ) ;
        $data = $query -> fetch( PDO::FETCH_OBJ );
        echo json_encode( array( 'result' => 1 ) ) ; 
    } catch(PDOException $e) {
        //echo $e ; 
        echo json_encode( array( 'result' => 0 ) ) ; 
    }

    exit();
?>