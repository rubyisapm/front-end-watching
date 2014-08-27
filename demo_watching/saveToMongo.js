/**
 * Created by ruby on 2014/8/5.
 */
/*
var mongodb= require('mongodb');
var server= new mongodb.Server('localhost',27017,{auto_reconnect:true});
var db= new mongodb.Db('mydb',server,{safe:true});

db.open(function(err,db){
    if(!err){
        console.log('connect db');
        db.createCollection('mycoll',{safe:true},function(err,collection){
            if(err){
                console.log(err);
            }else{
                var tmp1={title:'hello'};
                var tmp2={title:'world'};
                collection.insert([tmp1,tmp2],{safe:true},function(err,result){
                    console.log(result);
                });
                collection.find().toArray(function(err,docs){
                    console.log('find');
                    console.log(docs);
                });
                collection.findOne(function(err,doc){
                    console.log('findOne');
                    console.log(doc);
                });
            }
        })
    }else{
        console.log(err);
    }
})*/
// Retrieve
var MongoClient = require('mongodb').MongoClient;
var format= require('util').format;
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/rubydb", function(err, db) {
    if(!err) {
        console.log("We are connected");
        db.collection("users",{strict:true},function(err,collection){
            /*collection.remove(function(err,doc){
                collection.find().toArray(function(err,result){
                    console.dir(result);
                    db.close();
                })
            })*/
            collection.remove({name:"ruby"},function(err,result){
                collection.find().toArray(function(err,result){
                    console.dir(result);
                    db.close();
                })
            })
            /*var doc2 = [{mykey:2, docs:[{doc1:1}]},{name:"ruby"}];
            collection.insert(doc2, {w:1}, function(err, result) {
                collection.update({mykey:2}, {$set:{docs:{doc2:1}}}, {w:1}, function(err, result) {});
                collection.find().toArray(function(err,result){
                    console.dir(result);
                    db.close();
                })

            });*/
            //collection.insert({name:"ruby"},function(err,doc){
                /*collection.update({name:"ruby"}, {age:21}, function(err, result) {
                    console.log(result);
                    db.close();
                });*/

                /*collection.find().toArray(function(err,result){
                    console.dir(result);
                    db.close();
                })*/
            //})





        })







        /*var collection=db.collection('test_insert');*/
        /*just insert the data, you can add a callback to the "insert" event*/
        /*collection.insert([{age:21},{age:22},{age:23}],function(err,docs){
            *//*give the count*//*
            collection.count(function(err,count){
                console.log(format('count=%s',count));
            })

            *//*item the data*//*
            collection.find().toArray(function(err,results){
                console.dir(results);
                db.close();
            })
        })

        collection.remove({age:2},function(err,docs){
            collection.find().toArray(function(err,results){
                console.dir(results);
                console.log("done");
                db.close();
            })
        });*/
    }else{
        console.log("failed");
    }
});