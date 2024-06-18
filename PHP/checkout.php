<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './connect.php';
    $cid = $_GET["cid"]; 
    $sql = "select * from cart where CID = '" . $cid . "';" ;
    try{
        $query = $conn -> query($sql) ;
        $C = $query -> fetch( PDO::FETCH_ASSOC ); 
    }catch(PDOException $e)
    {
        //echo $e ; 
        echo json_encode( array( 'result' => 0 , 'error' => $e ) ) ; 
        exit();
    }
    $amount = $C['amount']; 
    $pid = $C['PID']; 
    $aid = $C['AID']; 
    try{        
        // check if the remaining amount is less than the current amount and the product has not been deleted ! 
        $sql = "select * from product where PID = " . $pid . ";" ;
        $query = $conn -> query($sql);
        $data = $query -> fetch( PDO::FETCH_ASSOC ); 
    }catch(PDOException $e)
    {
        //echo $e ; 
        echo json_encode( array( 'result' => 0 , 'error' => $e ) ) ; 
        exit();   
    }

    if( $data == NULL )
    {
        echo json_encode( array( 'result' => 2 ) ) ;//the product has been deleted 
        exit();
    }
    $remaining = $data['amount']; 
    $vid = $data['AID']; 
    $price = $data['price']; 
    if( $remaining < $amount )
    {
        echo json_encode( array( 'result' => 3 ) ) ;//the remaining amount is less than the current amount
        exit();
    }else{
        try{
            $conn -> query("update product set amount = " . ( $remaining - $amount ) . " where PID = " . $pid . ";"); 
        }catch(PDOException $e){
            //echo $e ; 
            echo json_encode( array( 'result' => 0 , 'error' => $e ) ) ; 
            exit();   
        }
    }

    try{
        $query = $conn -> query("select CURDATE();") ;
        $date = $query -> fetch( PDO::FETCH_ASSOC )['CURDATE()']; 
    }catch(PDOException $e)
    {
        //echo $e ; 
        echo json_encode( array( 'result' => 0 , 'error' => $e ) ) ; 
        exit();
    }

    $sql = 'insert into orders values( null, ' . $vid . ' , ' . $aid . ' , ' . $pid . ' , ' . $amount . ' , ' . $price . ' , "' . $date . '" , "requested");' ;
    echo $sql;

    try{
        $query = $conn -> query( $sql ) ;
        $data = $query -> fetch( PDO::FETCH_OBJ );
        echo json_encode( array( 'result' => 1 ) ) ; 
    } catch(PDOException $e) {
        //echo $e ; 
        echo json_encode( array( 'result' => 0 , 'error' => $e ) ) ; 
        exit();
    }
    exit();
?>