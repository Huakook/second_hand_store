<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');

    include './connect.php';
    $sql = 'select * from account where account = "' . $_POST['Email'] . '";';
    $query = $conn -> query( $sql ) ;
    $data = $query -> fetch( PDO::FETCH_ASSOC );

    if( $data == NULL )
    {
        echo json_encode( array( "result" => 0 ) );
        exit(); 
    }
    $hash = $data['hash'];
    $name = $data['name'];
    $picture = $data['picture'];

    if( password_verify( $_POST['Password'] , $hash ) == true )
    {
        echo json_encode( array( "result" => 1 , "Email" => $_POST['Email'] , "Name" => $name , "Picture" => $picture ) );//success
    }else{
        echo json_encode( array( "result" => 0 ) );
    }
    exit();
?>