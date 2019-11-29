var express = require('express');
var app = express();

const path = require('path');
app.use(express.static('public'));

app.get('/', function(req, res) {  
    res.sendFile(path.join(__dirname+'/html/index.html'));
});

app.get('/Contact us', function(req, res) {  
    res.sendFile(path.join(__dirname+'A:\hawri\Uni work\5007CEM NEW\5007CEM-project\html\about.html'));
});

var port = process.env.PORT || 3000;
app.listen(port);