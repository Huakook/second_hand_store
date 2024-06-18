<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    include './connect.php';
    //$d = 3 ;
    $name = $_POST['Name'];
    $aid=$_POST["AID"]; 
    var_dump( $_FILES );
    $file = $_FILES["File"]["name"];
    var_dump($_FILES);  
    $condition = $_POST['Condition'];
    $price = $_POST['Price'];
    $year = $_POST['Year'];
    $amount = $_POST['Amount'];
    $description = $_POST['Description']; 

    $sql = "insert into product values( null , '" . $name . "' , " . $aid . " , '"  . $file . "' , '" . $condition . "' , " . $price . " , " . $year . ", " . $amount . " , '" . $description . "');" ;
    echo $sql;
    echo json_encode( array( 'result' => 1 ) ) ;
    try{
        $query = $conn -> query( $sql ) ; 
        
        $sql = "SELECT * FROM product ORDER BY PID DESC LIMIT 1;";
        $query = $conn -> query( $sql ) ;
        $data = $query -> fetch( PDO::FETCH_ASSOC );
        $pid = $data["PID"]; 

        $target_dir = "C:\Users\user\Desktop\Lectures\\3-2 Lectures\DBMS\Term Project\second-hand-store\src\photo\\"; 
        $target_file = $target_dir . basename("product" . $pid . ".png");
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

        $check = getimagesize($_FILES["File"]["tmp_name"]);// check if the image file is a actual image 
            if($check !== false) {
                echo "File is an image - " . $check["mime"] . ".";
                $uploadOk = 1;
            } else {
                echo json_encode( array( 'result' => 2 , 'msg' => "It is not an image" ) ) ; 
                $uploadOk = 0;
            }
       
        if ($_FILES["File"]["size"] > 500000) {// check the file size
            echo json_encode( array( 'result' => 2 , 'msg' => " the file is too large" ) ) ; 
            $uploadOk = 0;
        }
        
        if($imageFileType != "jpg" && $imageFileType != "png") {// check the file formats
            echo json_encode( array( 'result' => 2 , 'msg' => "only jpg and png files are allowed" ) ) ; 
            $uploadOk = 0;
        }
        
        if ($uploadOk == 0) {
            echo json_encode( array( 'result' => 2 , 'msg' => "uploading fails" ) ) ; 
        } else {//upload the file
            if ( move_uploaded_file($_FILES["File"]["tmp_name"], $target_file ) ) {
                echo json_encode( array( 'result' => 3 , "PID" => $pid ) ) ; 
            } else {
                echo json_encode( array( 'result' => 2 , 'msg' => "Sorry, error when uploading the file" ) ) ; 
            }
        }
        echo json_encode( array( 'result' => 1 , "PID" => $pid ) ) ; 
    } catch(PDOException $e) {
        //echo $e ; 
        echo json_encode( array( 'result' => 0 ) ) ; 
    }

    exit();
?>