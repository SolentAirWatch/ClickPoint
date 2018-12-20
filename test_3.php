<html>  
<head>
    <script src="js/jquery.js"></script>
<title> Simple script to write GeoJSON to SQL </title>
</head>

    
<body>

    hello
<?php

    $dbServername = "localhost";
    $dbUsername = "sec_user";
    $dbPassword = "!@£kitty12";
    $dbName = "leafletDB";

    // include_once 'includes/dbh.inc.php';


    $name = 'london';
    $latititude = "51.5273068";
    $longditude = "-0.6619993";
    $type = 'good';
    $reason = 'I love lamas';
    
    $conn = mysqli_connect($dbServername,$dbUsername, $dbPassword, $dbName);
    if(! $conn ){
        die('Could not connect: ' . mysqli_error());
    }
    echo 'Connected successfully' . "<br>";
    
     // echo json_encode($rows);

    //            
    //
    //// Create connection


    $sql = "INSERT INTO geoData (NAME,LATITUDE,LONGDITUTE,type,reason) 
    VALUES ('$name', $latititude, '$longditude', '$type', '$reason')" ;
    
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
    mysqli_close($conn);
?>
    
        
</body>
</html>