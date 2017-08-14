$(document).ready(function () {
    $("#formLogin").validate({
        rules: {
            UserName: {
                required: true,
                minlength: 3
            },
            Password: {
                required: true,
                minlength: 4
            }
        }
    });
    $(function() {
        $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
            function(json) {
                conventionIp = json.ip;
                logFile = true;
                navigator.geolocation.getCurrentPosition(setUbicacion, geoError);
            }
        );
    });
});

function setUbicacion(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    if (!logFile) {
        latlng = new google.maps.LatLng(lat, lng);
        if (flagDemo) {
            lat = 40.4192332;
            lng = -3.6981982;
            latlng = new google.maps.LatLng(lat, lng);
            _address = "Calle Gran Vía, 1, 28013 Madrid, Madrid, España";
        } else {
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        _address = results[0].formatted_address;        //this is the full address

                        //           // results[0].types[0] is "street_address"
                        //           $.each(results[0].address_components, function( index, value ) {
                        //               switch (value.types[0]) {
                        //                   case "street_number":
                        //                       _number = value.long_name;
                        //                   case "route":
                        //                       _calle = value.long_name;
                        //                   case "locality":
                        //                       _ciudad = value.long_name;
                        //                   case "administrative_area_level_2":
                        //                       _provincia = value.long_name;
                        //                   case "administrative_area_level_1":
                        //                       _comunidad = value.long_name;
                        //                   case "country":
                        //                       _pais = value.long_name;
                        //                   case "postal_code":
                        //                       _codpostal = value.long_name;
                        //               }
                        //           });

                    } else
                        $("#mapCanvas").append('<br/>  ' + Translation.getText('msg023'));
                } else
                    $("#mapCanvas").append('<br/>  ' + Translation.getText('msg024') + ': ' + status);
            });
        }
    } else {
        var _latlng = lat + ', ' + lng;
        var msj = "IP " + conventionIp + "  latlng " + _latlng;
        invokeService("SaveLogFile", { mensaje: msj });
        logFile = false;
    }
}
