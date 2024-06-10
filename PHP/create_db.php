<?php
    $sql = file_get_contents('dbase.sql');
    try {
        $conn -> exec( $sql ) ; 
    }catch( PDOException $e ){
        // echo $e ; 
    }
?>