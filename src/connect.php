<?php
    $servername = "localhost" ;
    $username = "root" ;
    $password = getenv('DBpassw'); 
    $dbname = "undergraduate_project";
    try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo "Connected successfully";
            include_once "create_db.php" ; 
        } 
    catch(PDOException $e) 
        { 
             echo "Connection failed: " . $e->getMessage() ; 
        } 
?>