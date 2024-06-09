<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    if( $_POST[ $_POST['Email'] ] == $_POST['VerificationCode'] )
    {
        echo json_decode( array( 'result' => 1 ) );
    }else{
        echo json_decode( array( 'result' => 0 ) );
    }
?>