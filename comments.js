// Create web server
// http://localhost:3000/comments

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var util = require('util');

// Configure body-parser to read data sent by HTML form tags
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/comments', function(req, res) {
    console.log('GET comments');
    var comments = JSON.parse(fs.readFileSync('./comments.json', 'utf8'));
    res.json(comments);
});

app.post('/comments', function(req, res) {
    console.log('POST comments');
    console.log(req.body);
    var comments = JSON.parse(fs.readFileSync('./comments.json', 'utf8'));
    comments.push(req.body);
    fs.writeFileSync('./comments.json', JSON.stringify(comments));
    res.json(comments);
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});