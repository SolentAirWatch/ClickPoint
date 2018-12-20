
<html>
<head>
    <script src="js/jquery.js"></script>
<body>
    
<script>

    
    newData = {
        'name': 'Hobbit',
        'lat': '50.472225',
        'long': '-2.2935023',
        'type': 'bad',
        'reason': 'sandwhich'
    }

    saveMapPoint(newData);

    function saveMapPoint(newPoint) {

        console.log('I got this far');
        $.post("savePoints.php", {
            NAME: newPoint["name"],
            LATITUDE: newPoint["lat"],
            LONGDITUTE: newPoint["long"],
            type: newPoint["type"],
            reason: newPoint["reason"]    
        }).done(function() {
            alert( "success" );
        });
    }
        
    console.log('I got this far');

</script>
</body>
</html>