
<html>
<head>
    <script src="js/jquery.js"></script>
<body>
    
<script>

    
    newPoints = {
        'name': 'Hobbit',
        'coordinates': [-2.2935023, 50.472225],
        'type': 'bad',
        'reason': 'sandwhich',
        'improvement': 'eat it'
    }

    saveMapPoint(newPoints);

    function saveMapPoint(newPoint) {
        console.log('I got this far');
        $.post("savePoints.php", {
            NAME: newPoint["name"],
            LATITUDE: newPoint.coordinates[0],
            LONGDITUTE:  newPoint.coordinates[1],
            TYPE: newPoint["type"],
            REASON: newPoint["reason"],
            IMPROVEMENT: newPoint['improvement']
        }).done(function() {
            alert( "success" );
        });
    }
        
    console.log('I got to the end');

</script>
</body>
</html>