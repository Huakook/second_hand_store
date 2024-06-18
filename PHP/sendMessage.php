<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './connect.php';
    //$d = 3 ;
    try{
        $message = $_GET['message'];
        $vName = $_GET['vname'];
        $cName = $_GET['cname'];
        $sender = $_GET['sender'];

        $query = $conn -> query("select * from account where name = '" . $vName . "';" ) ;
        $vid = $query -> fetch( PDO::FETCH_ASSOC )['AID'] ; 
        $query = $conn -> query("select * from account where name = '" . $cName . "';" ) ;
        $cid = $query -> fetch( PDO::FETCH_ASSOC )['AID'] ; 

        $sql = 'insert into chat values( null , ' .  $vid . ' , ' . $cid . ' , "' . $sender . '" , "' . $message  . '" , curdate() , curtime() );'; 
        echo $sql; 
        $query = $conn -> query( $sql ) ;
        echo json_encode( array( 'result' => 1 ) ) ; 
    } catch(PDOException $e) {
        //echo $e ; 
        echo json_encode( array( 'result' => 0 ) ) ; 
    }

    exit();
?>