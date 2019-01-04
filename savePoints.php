<?php
include_once 'includes/dbh.inc';

$conn = new mysqli($dbServername, $dbUsername, $dbPassword, $dbName); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";

$name = mysqli_real_escape_string($conn, $_POST['NAME']);
$latitude = mysqli_real_escape_string($conn, $_POST['LATITUDE']);
$longitude = mysqli_real_escape_string($conn, $_POST['LONGITUDE']);
$type = mysqli_real_escape_string($conn, $_POST['TYPE']);
$reason = mysqli_real_escape_string($conn, $_POST['REASON']);
$improvement = mysqli_real_escape_string($conn, $_POST['IMPROVEMENT']);

if (strlen($times) > 200000) {  $times = "";    }

$sql = "INSERT INTO geoData (NAME,LATITUDE,LONGITUDE,TYPE,REASON,IMPROVEMENT)
VALUES ('$name', '$latitude', '$longitude', '$type', '$reason', '$improvement')";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>


