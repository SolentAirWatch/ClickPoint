<?php
include_once 'includes/dbh.inc';


$conn = new mysqli($dbServername, $dbUsername, $dbPassword, $dbName); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";

$name = mysqli_real_escape_string($conn, $_POST['NAME']);
$latitude = mysqli_real_escape_string($conn, $_POST['LATITUDE']);
$londitude = mysqli_real_escape_string($conn, $_POST['LONGDITUTE']);
$type = mysqli_real_escape_string($conn, $_POST['TYPE']);
$reason = mysqli_real_escape_string($conn, $_POST['REASON']);
$improvement = mysqli_real_escape_string($conn, $_POST['IMPROVEMENT']);

//$name = mysqli_real_escape_string($conn, 'house');
//$latitude = mysqli_real_escape_string($conn, '0.1223');
//$londitude = mysqli_real_escape_string($conn, '51.1231');
//$type = mysqli_real_escape_string($conn, 'bad');
//$reason = mysqli_real_escape_string($conn, 'there is a house');
//$improvement = mysqli_real_escape_string($conn, 'move it');


if (strlen($times) > 200000) {  $times = "";    }

$sql = "INSERT INTO geoData (NAME,LATITUDE,LONGDITUTE,TYPE,REASON,IMPROVEMENT)
VALUES ('$name', '$latitude', '$londitude', '$type', '$reason', '$improvement')";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>


