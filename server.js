var express = require('express');
var request = require('request');

var app = express();

app.use(express.static(__dirname + '/public'));


app.set('view engine', 'ejs');




app.get('/', function(req, res) {

    var city = req.query.city;

    if(city == undefined){
        city = "lelystad";
    }
    var url =  `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=271d1234d3f497eed5b1d80a07b3fcd1`;

    request(url, function (error, resp, body) {

        weather_json = JSON.parse(body);

        var weather = {
            city : city,
            temperature : Math.round(weather_json.main.temp),
            description : weather_json.weather[0].description,
            icon : weather_json.weather[0].icon
        }

        var weather_data = {weather : weather};
        res.render('weather', weather_data);
    });

});


app.post('/', function (req, res) {
    res.redirect('/')
});

app.listen(8000);