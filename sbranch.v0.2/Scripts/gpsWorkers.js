var i=0;

function timedCount() {
    i = i + 1;
    navigator.geolocation.getCurrentPosition(function () {
        postMessage(i);
    }, geoError);

    setTimeout("timedCount()", 500);
}

function geoError(error_codes) {
    switch (error_codes) {
        case "NOT_SUPPORTED":
            alert(Translation.getText('msg025'));
            break;
        case "PERMISSION_DENIED":
            alert(Translation.getText('msg026'));
            break;
        case "POSITION_UNAVAILABLE":
            alert(Translation.getText('msg027'));
            break;
        case "TIMEOUT":
            alert(Translation.getText('msg028'));
            break;
        case "UNKNOWN_ERROR":
            alert(Translation.getText('msg029'));
            break;
        default:
            break;
    }
}

timedCount();