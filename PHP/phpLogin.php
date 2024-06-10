<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');

    include './connect.php';
    $sql = 'select hash from account where account = "' . $_POST['Email'] . '";';
    $query = $conn -> query( $sql ) ;
    $data = $query -> fetch( PDO::FETCH_ASSOC );
    $hash = $data['hash'];

    if( password_verify( $_POST['Password'] , $hash ) == true )
    {
        echo json_encode( array( "result" => 1 ) );
    }else{
        echo json_encode( array( "result" => 0 ) );
    }
?>