//import express module
var express = require('express');
//create an express app
var app = express();

//add a callback function to handle 
//get request on the root
app.get('/', function(req, res) {

    //save the html code in a variable
    var homePage = "<h1 style='color:red'>Welcome to cubic Games</h1>";
    //send the html code to the client
    res.send(homePage);

});
//run the server on port 3000
app.listen(3000);