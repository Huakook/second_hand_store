<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    if( $_POST['Code'] == $_POST['VerificationCode'] )
    {
        $email = $_POST['Email'] ;
        $name = $_POST['Name'];
        $hash = password_hash( $_POST['Password'] , PASSWORD_DEFAULT );
        $picture = './photo/' . $_POST['Picture'] . '.png';

        include './connect.php';
        $sql = 'insert into account values( null , "' . $name . '" , "' . $email . '" , "' . $hash . '" , "' . $picture . '" );';
        try{
            $conn -> query( $sql ) ; 
        }catch( PDOException $e ){
            echo json_encode( array( 'error' => $e ) );//sql error 
            exit(0);
        }
        echo json_encode( array( 'result' => 1 ) );
    }else{
        echo json_encode( array( 'result' => 0 ) );//verification failed 
    }
?>