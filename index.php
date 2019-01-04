<?php
    include_once 'includes/dbh.inc';
?>

<html>
<head>

    <title> Solent Air Watch - Community Map</title>
    <link rel="stylesheet" type="text/css" href="css/leaflet.css"/>
    <link href="css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" href="css/leaflet.awesome-markers.css">
    <link rel="stylesheet"  type="text/css" href="css/inputPoints.css" />
    <script src="js/leaflet.js"></script>
    <script src="js/leaflet.awesome-markers.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery-form-validator/2.3.26/jquery.form-validator.min.js"></script>

</head>
<body>

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-hea der">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Pre-release test site</h4>
      </div>
      <div class="modal-body">
          <p>If you were not expecting to take part in testing, you are lost!</p>
          <h5>Known Issues</h5>
          <ul>
              <li>A pop up should show when you click on the map. Please click on the new marker to open it</li>
              <li>When clicking between new (blue) markers the pop-up content doesn't load, click the save and cancel buttons instead</li>
          </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>

<?php
    $conn = mysqli_connect($dbServername,$dbUsername, $dbPassword, $dbName);
    if(! $conn ){
        die('Could not connect: ' . mysqli_connect_error());
    }
    // echo 'Connected successfully' . "<br>";
    $sql = 'SELECT * FROM geoData';

    $result = mysqli_query($conn, $sql);
    $rows = [];
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
    } else {
        echo "0 results";
    }
    mysqli_close($conn);
?>

<!-- Output the result to javaScript  -->
<script type="text/javascript">
    var data = <?= json_encode($rows); ?>;
</script>
    <p>
        <div id="map" data-mode="">
            <input type="hidden" data-map-markers="" value="" name="map-geojson-data" />
        </div>
    </p>

    <p> Details about the marker can be viewed or edited by clicking the marker. Click the map to add a new marker. Make sure you click the done button below!!</p>
    <p>
        <b>Alpha Testing</b> If you are a developer please help us by logging issues on <a href="https://github.com/SolentAirWatch/ClickPoint"> the github</a>.
        <b>Please note: </b> Contributions will be reviewed and those not meeting our community guidelines will be removed. By contributing you allow us to store your data. Your contribution is anonymous but you can separately join our mailing list. Please read our privacy policy for more details.

    </p>

    <div id="container">
        <div>
            <input class="btn-done" type="button" value="I'm done - save my points" />
        </div>
    </div>


        <script src="js/inputPoints.js"></script>
</body>
</html>
