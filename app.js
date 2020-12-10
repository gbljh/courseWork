const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false})
let brightness = "-1";
app.get("/getBrightness", urlencodedParser, function (request, response) {

    if(brightness=="-1"){
        brightness = JSON.parse(fs.readFileSync("brightness.json", "utf8"))["brightness"];
    }
    response.send(brightness);
})

app.post("/setBrightness", urlencodedParser, function (request, response) {
    if(!isNaN(parseInt(request.body.brightness))){
        brightness = request.body.brightness;
        fs.writeFileSync("brightness.json", "{\"brightness\":\""+brightness+"\"}")
        response.send("OK");
    }
    else{
        response.send("Error. You should send integer");
    }
})

app.listen(8080);