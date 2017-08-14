var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var port = 8000;
var url='localhost'
var server = app.listen(port);

app.use(express.static(__dirname + '/'));
console.log('Simple static server listening at '+url+':'+port);
