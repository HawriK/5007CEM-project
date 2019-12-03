var express = require('express');
var app = express();

const path = require('path');
app.use(express.static('public'));

app.get('/', function(req, res) {  
    res.sendFile(path.join(__dirname+'/html/index.html'));
});

app.get('/about', function(req, res) {  
    res.sendFile(path.join(__dirname+'/html/about.html'));
});

var port = process.env.PORT || 3000;
app.listen(port);