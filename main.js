/**
 * Created by ruby on 2014/9/14.
 */
var express=require("express");
var app=express();
var queryString=require("querystring");
var mongodb=require("mongodb");
var mongoClient=mongodb.MongoClient;
var Db=mongodb.Db;
var crypto=require('crypto');
var ejs=require("ejs");
ejs.open = '{{';
ejs.close = '}}';

app.set("view engine","ejs");

app.use('/images',express.static(__dirname+'/images'));
app.use('/styles',express.static(__dirname+'/styles'));
app.use('/scripts',express.static(__dirname+'/scripts'));

app.use("/apply",require('./ruby_modules/routers/apply').router);
app.use("/submit",require('./ruby_modules/routers/submit').router);
app.use("/applyForDot",require('./ruby_modules/routers/applyForDot').router);
app.use("/submitInfo",require('./ruby_modules/routers/submitInfo').router);
app.use("/dots",require('./ruby_modules/routers/dots').router);
app.use('/deleteDot',require('./ruby_modules/routers/deleteDot').router);
app.use('/records',require('./ruby_modules/routers/records').router);


app.listen("3000");