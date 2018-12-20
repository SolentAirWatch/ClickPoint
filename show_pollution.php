<?php
    include_once 'includes/dbh.inc.php';
?>

<html>
<head>
    
    <title> Simple script to collect GeoJSON form SQL </title>
    <link rel="stylesheet" type="text/css" href="css/leaflet.css"/>
    <link rel="stylesheet" type ="text/css" href="css/click-points.css"/> 
    <link href="css/font-awesome.css" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/leaflet.awesome-markers.css">
    <script src="js/leaflet.js"></script>
    <script src="js/leaflet.awesome-markers.min.js"></script>
    <script src="js/jquery.js"></script>
    
</head>
<body>

<!-- Get the data from SQL -->
<?php
    $conn = mysqli_connect($dbServername,$dbUsername, $dbPassword, $dbName);
    if(! $conn ){
        die('Could not connect: ' . mysqli_error());
    }
    // echo 'Connection successful';
    $sql = 'SELECT * FROM geoData';

    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
           // echo json_encode($row) . "<br>";
        }
     } else {
        echo "0 results";
     } 
     // echo json_encode($rows);
    mysqli_close($conn);
?>

<!-- Output the result to javaScript  -->
<script type="text/javascript">
        var data = JSON.parse( '<?php echo json_encode($rows); ?> ' ); 
</script>
    
    <h1>
            Click the map to add points
        </h1>
        <p>
            <div id="map" data-mode="">
                <input type="hidden" data-map-markers="" value="" name="map-geojson-data" />
            </div>
        </p>

        <script src="js/show_pollution.js"></script>
    
</body>
</html>