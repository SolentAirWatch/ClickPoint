<?php
include_once 'includes/dbh.inc.php';


$conn = new mysqli($dbServername, $dbUsername, $dbPassword, $dbName); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 
echo 'Connected successfully' . "<br>";

$name = mysqli_real_escape_string($conn, $_POST['NAME']);
$latitude = mysqli_real_escape_string($conn, $_POST['LATITUDE']);
$londitude = mysqli_real_escape_string($conn, $_POST['LONGDITUTE']);
$type = mysqli_real_escape_string($conn, $_POST['type']);
$reason = mysqli_real_escape_string($conn, $_POST['reason']);


if (strlen($times) > 200000) {  $times = "";    }

$sql = "INSERT INTO geoData (NAME,LATITUDE,LONGDITUTE,type,reason)
VALUES ('$name', $latitude, '$londitude', '$type', '$reason')";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>