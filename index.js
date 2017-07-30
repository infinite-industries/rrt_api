// working on seeding the database

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');


var app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var artworks = require('./routes/artworks');
app.use('/artworks', artworks);

mongoose.connect('mongodb://localhost/infinite-api');


var appPort = process.env.PORT || '3003';

app.listen(appPort, function () {
    console.log("Magic on port %d", appPort);
});
