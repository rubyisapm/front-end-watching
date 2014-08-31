/*
 * Created by ruby on 2014/8/5
*/
//just test
// Retrieve

var mongodb=require("mongodb");
var Db=mongodb.Db;
var MongoClient = mongodb.MongoClient;
var Server=mongodb.Server;
var format= require('util').format;
var db=new Db("dot",new Server("localhost",27017));
/*db.open(function(err,db){
    db.createCollection("test",function(err,collection){
        collection.insert({name:"ruby",time:new Date().toDateString()},function(err,doc){
            collection.find().toArray(function(err,result){
                console.log(result);
            })
        })
    })
});*/
MongoClient.connect("mongodb://localhost:27017/watching",function(err,db){
    /*db.dropDatabase(function(err,result){
        console.log(result);
    })*/
    db.collection("records",function(err,collection){
     /*collection.insert({},function(err,doc){
            collection.find().toArray(function(err,result){
                console.log(result);
            })
        })*/
        var dotId="db24";
       collection.update({dotId:dotId},{$push:{operations:{time:"changed"}}},function(err,result){
            console.log(result);
        })
    })
})



