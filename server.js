// Dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Uses for getting page elements
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Connect to DB with mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/CandyShop", function(err){
	if(err){
		console.log("Error: " + err);
	}
	else {
		console.log("Connected to MongoDB")
	}
});

// Mongoose Schema - New Candy
var Candy = mongoose.model("Candy",{
	name:String,
	description:String,
	price:Number,
});

// CREATE - POST candy to DB
app.post("/addCandy",function(request, response){
    var newCandy = new Candy(request.body);
    newCandy.save();
    response.status(201);
    response.send(newCandy);
});

// READ - GET all candy from DB
app.get("/seeAllCandy", function(request, response){
   Candy.find({}).exec(function(err,candy){
       if(err){
           console.log("Error" + " " + err);
       }
       else{
           response.send(candy);
           console.log("Candy List loaded from DB and sent to user");
       }
   }) 
});

// UPDATE - PUT (update) a candy in the DB by the id
app.put("/editCandy/:_id", function(request, response){
    
    var editedCandy = request.body;

    Candy.findOne({_id:request.params._id}).exec(function(err,singleCandy){
        if(err){
            console.log("Error" + " " + err);
        }
        else{
            if(singleCandy){
                singleCandy.name = request.body.name;
                singleCandy.description = request.body.description;
                singleCandy.price = request.body.price;
                singleCandy.save();
                response.send(singleCandy);
            }
            else{
                console.log("There was an issue editing the candy. The error was: " + " " + err.status);
            }      
        }
    })
});

// DELETE - delete specific candy from the DB
app.delete("/deleteCandy/:_id",function(request,response){
    Candy.remove({_id:request.params._id}).exec(function(err,deletedCandy){
        if(err){
            console.log("Error" + " " + err)
        }
        else{
            response.status(204);
            response.send("Candy removed from the DB");
        }
    })
});

// allows the server to connect on port 3000 
app.listen(3000,function(){
	console.log("Listening on http://localhost:3000");
});