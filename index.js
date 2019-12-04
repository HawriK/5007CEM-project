//import express module
var express = require('express');
var parser = require('body-parser');

const db = require('./database');

//create an express app
var app = express();

const path = require('path');
app.use(parser.json());
app.use(express.static('public'));

//perpare our database connection parameters
const databaseData = {
    host:"localhost",
    user:"root",
    password:"",
    database: "emperor_games",
    port: 3306
};

//add a callback function to handle 
//get request on the root
app.get('/', function(req, res) {  
    res.sendFile(path.join(__dirname+'/html/index.html'));
    });
    
    app.get('/about', function(req, res) {  
    res.sendFile(path.join(__dirname+'/html/about.html'));
    });
    
    app.get('/contact', function(req, res) {  
    res.sendFile(path.join(__dirname+'/html/contact.html'));
    });


app.get('/createDB', function(req, res) {  
    //run the create table function
    db.createTables(databaseData, function(err, result){
        //if amy error happend send an error response
        if(err) {
            res.status(400);
            res.end("an error has occured:" + err);
            return;
        }
        //otherwise we created tables successfully
        res.status(200);
        res.end("tables were created successfully");
    });
});

//this function is to handle a new contact request
app.post('/handlecontact', function(req, res){
    
    //validate the data
    //forename is required
    if(req.body.forename === undefined){
        res.status = 400;
        res.send({message:"forename is required"});
        console.log("forename is undefined");
        return;
    }//forename must be at least 2 characters long
    else if(req.body.forename.length < 2){
        res.status = 400;
        res.send({message:"forename is too short"});
        console.log("forename is short");
        return;
    }

    //surname is required
    if(req.body.surname === undefined){
        res.status = 400;
        res.send({message:"surname is required"});
        console.log("surname is undefined");
        return;
    }

    //email is required
    if(req.body.email === undefined){
        res.status = 400;
        res.send({message:"email is required"});
        console.log("email is undefined");
        return;
    }//email should be at least 5 characters long
    else if(req.body.email.length < 5 ){
        res.status = 400;
        res.send({message:"email is too short"});
        console.log("email is short");
        return;
    }
    else {
        //email must match a specific pattern for a valid email
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(req.body.email).toLowerCase())){
            res.status = 400;
            res.send({message:"invalid email format"});
            console.log("email is wrong");
            return;
        }
    }
    
    //data validation is correct 
    //connect to database and save the data

    console.log("now adding to db")
    //we need to created an object with fields that matches database fields
    //otherwise we get errors
    const newContact =  {
        forename: req.body.forename,
        surname: req.body.surname,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
        dateRecieved: new Date()
    }
    //we are atempting to add a new contact
    //call the addConact function
    db.addContact(databaseData, newContact, function (err, data){
        
        if(err)
			console.log(err)

        //our response will be a json data
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET, POST')
        //when adding a user is done, this code will run
        //if we got an error informs the client and set the proper response code
        if(err){
            res.status(400);
            res.end("error:" + err);
            return;
        }
        //if no error let's set proper response code and have a party
        res.status(201);
        res.end(JSON.stringify({message:"we recieved your message"}));
    });
   
})

var port = process.env.PORT || 3000;
//run the server on port 3000
app.listen(port, () => {
    console.log("server running on port:" + port);
});