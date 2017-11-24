//adding express to the app
var express = require('express');
//including it the application
var app = express(); 
//now we can use various express functionalities using the app variable

//adding bodyParser and cookieParser middlewares
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

//adding mongoose module
var mongoose = require('mongoose');

//connection to the database
var dbPath = "mongodb://localhost/blogapp";
mongoose.connect(dbPath);
mongoose.connection.once('open', function () {
	console.log("Connection Has Been Established Successfully");
});

//adding application level middleware
app.use(bodyParser.json({
	limit: '10mb',
	extended: true
}));
app.use(bodyParser.urlencoded({
	limit: '10mb',
	extended: true
}));
app.use(function (req, res, next) {
  //for accessing details how user is using it
  console.log('Time of request:', Date.now());
  console.log("request url is ",req.originalUrl);
  console.log("request ip address is",req.ip)

  next();
});
//end of application level middleware

//include the schema or model designed to the app
var blogModel = require('./Model.js');

//routes start here
//default route
app.get('/', function (req, res) {

  res.send("This is a sample blog application..Some route samples are 1.");

});

/////all the manipulating routes start here//////
//route to get all the blogs at once
app.get('/allblogs',function(req,res){

	blogModel.find(function(err,result){
		
		if(err){
			console.log("There's an error while publishing all the blogs");
			res.send(err);
		}
		else{
			console.log("All the blogs have in accessed");
			res.send(result);
		}
	});
});
//end route


//route to find out a particular route
app.get('/allblogs/:id',function(req,res){
	
	blogModel.findById({
		_id: req.params.id
	}, function (err, result) {
		if (err) {
			console.log('Error in finding the blog by ID');
			res.send(err);
		} else {
			res.send(result);
		}
	});
});
//end route

//to create a new entry to the blog
app.post('/blog/create', function (req, res) {
	var newBlog = new blogModel({
		
		title 		: req.body.title,
		subTitle 	: req.body.subTitle,
		introduction: req.body.introduction,
		blogBody 	: req.body.blogBody,
		endNote		: req.body.endNote
	});

	//assigning date
	newBlog.created = Date.now();

	
	//to save the entered details and error handeling
	newBlog.save(function (error, result) {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			res.send(result);
		}
	});
});
//end route

//to edit the existing blog
app.put('/allblogs/:id/edit', function(req,res){
	
	var changes = req.body;
	blogModel.findOneAndUpdate({
		_id: req.params.id}, changes, function(err, result){
			
			if(err){
				console.log("Error while changing the blog");
				res.send(err);
			}
			else{
				res.send(result);
			}
		});
});
//end route

//route to delete a blog
app.post('/allblogs/:id/delete', function(req,res){
	
	blogModel.remove({
		_id: req.params.id}, function(err,result){
			
			if(err){
				console.log("Error while deleting the particular file");
				res.send(err);
			}
			else{
				res.send(result);
				console.log("One entry has been deleted");
			}
		});
});
//end route





app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});