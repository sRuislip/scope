function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
readTextFile("/Users/Documents/workspace/test.json", function(text){
    var data = JSON.parse(text);
    console.log(data);
});
//This function works also for loading a .html or .txt files, by overriding the mime type parameter to "text/html", "text/plain" etc.