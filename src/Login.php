<?php
    $email = $_POST['Email'] ;
    $password = $_POST['Password'];
    echo 'HHHHHHHHHHHHHHHHHHHHHh' ;
?>
        console.log( order );
        var php =""; 
        if( order === "time" ){
            php = 'http://localhost:8000/queryProducts.php'; 
        }else if( order === "price" ){
            php = 'http://localhost:8000/queryProductsByPrice.php'; 
        }else if( order === "year" ){
            php = 'http://localhost:8000/queryProductsByYear.php'; 
        }
        try {
            const response = fetch(php);
            const data = response.json();
            setProducts( data );
            //console.log( data ) ;
            //console.log( sessionStorage.getItem("Log") ); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }