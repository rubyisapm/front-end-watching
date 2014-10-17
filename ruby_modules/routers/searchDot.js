/**
 * Created by ruby on 2014/10/16.
 */
var express=require('express');
var router=express.Router();
var queryString=require('querystring');
var mongodb=require('mongodb');
var mongoClient=mongodb.MongoClient;
router.use(function(req,res){
    var postData='';
    req.on('data',function(data){
        postData+=data;
    })
    req.on('end',function(){
        var data=queryString.parse(postData);
        mongoClient.connect('mongodb://localhost:27017/watching',function(err,db){
            var answer={};
            if(err){
                db.close(true,function(err,result){
                    if(!err){
                        answer.status=false;
                        answer.massage='This is a error of "connect to db"!';
                        res.send(answer);
                    }
                })
            }else{
                db.collection('dots',function(err,collection){
                    if(err){
                        answer.status=false;
                        answer.message='This is a error of "connect to dots"!';
                        res.send(answer);
                    }else{
                        collection.find(data).toArray(function(err,results){
                            if(results.length>0){
                                answer.status=true;
                                answer.results=results;
                            }else{
                                answer.status=true;
                                answer.message='no dots';
                            }
                            res.send(answer);
                        })
                    }


                })
            }

        })
    })
})
exports.router=router;