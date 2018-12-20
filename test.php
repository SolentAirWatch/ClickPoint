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
    <script src="js/jquery.js"></script>
    
</head>
<body>

<?php
    $conn = mysqli_connect($dbServername,$dbUsername, $dbPassword,$dbName);

    
    $sql = "SELECT * FROM geoData;";
    $result = mysqli_query($conn,$sql);
    $resultCheck = mysqli_num_rows($result);

    echo $resultCheck;

    if($resultCheck > 0){
        while ($rows = mysqli_fetch_array($result)){
            echo $rows;
        }
    }
    else{
        echo "didn't get any data";
    }
    echo $rows
?>


<script type="text/javascript">
// boolean outputs "" if false, "1" if true
        var data = JSON.parse( '<?php echo json_encode($rows); ?> ' ); 
        console.log(data)
</script>



    
    <h1>
            Click the map to add points
        </h1>
        <p>
            <div id="map" data-mode="">
                <input type="hidden" data-map-markers="" value="" name="map-geojson-data" />
            </div>
        </p>

        <p>
            <b>Please note: </b> points submitted without a reason will be automatically deleted and not displayed on our maps.
        </p> 
        
        <div id="container">
            <div>
                <input class="btn-good" type="button" value="click to select good points" />
                <input class="btn-bad" type="button" value="click to select bad points" /> 
                <input class="btn-done" type="button" value="I'm done - save my points" />
            </div>
        </div>


        <script src="js/click-points.js"></script>
        <script src="js/leaflet.awesome-markers.min.js"></script>
    
    
  
    
</body>
</html>