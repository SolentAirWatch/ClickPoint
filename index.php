<?php
    include_once 'includes/dbh.inc';
?>

<html>
<head>

    <title> Air Watch - Community Map</title>
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
        <h4 class="modal-title">Contribute knowledge</h4>
      </div>
      <div class="modal-body">
          <p>By contributing to our map, you give concent for the data to be stored, publically shared and used for research. You will be asked to answer an optional survey following your contribution. </p>
          <p>We do not record any personally identifiable information. </p>
          <h5>How to contribute</h5>
          <ul>
              <li>Click anywhere on the map to make a new points</li>
              <li>Click your new point</li>
              <li>Fill in the form in the popup </li>
              <li>Repeat as many times as you like</li>
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

    <p>Click anywhere on the map to contribute a point, then click your new point to share your knowledge. You can view other contributions by clicking markers. <strong> Make sure you click the done button below!! </strong></p>
    <p>
        <b>Please note: </b> Contributions will be reviewed and those which are incomprehensible, offensive or blame individuals will be removed. By contributing you concent for us to store and share the data your commit with the public (freely) and it may be used for furture research. Your contribution is anonymous but you can separately join our mailing list.
    </p>

    <div id="container">
        <div>
            <input class="btn-done" type="button" value="I'm done - save my points" />
        </div>
    </div>


        <script src="js/inputPoints.js"></script>
</body>
</html>
