//Including mongoose
var mongoose = require("mongoose");
//Defining the mongoose Schema
var Schema = mongoose.Schema;

//Declaring the new schema and exporting to the main app

module.exports = mongoose.model('Blog', new Schema({
	

	title 		: {type:String,default:''},				 //Title of the blog
	subTitle 	: {type:String,default:''},				 //Sub-Title if any
	introduction: {type:String,default:''},				 //Intro of the blog
	blogBody 	: {type:String,default:''},				 //Main content what you needed to include
	endNote		: {type:String,default:''},				 //Conclusion of the blog you have created
	tags		: [],									 //Name of tags in array, like names of people or sources
	created		: {type:Date,default:Date.now},			 //Creation date
	lastModified: {type:Date},							 //Last time blog has been modified on
	authorInfo  :  {} 									 // information of author in form of object

}));