/**
 * Created by ruby on 2014/9/24.
 */
var mongodb=require("mongodb");
var mongoClient=mongodb.MongoClient;
var express=require('express');
var router=express.Router();
router.use(function(req,res){
    if(/^\?dotId=.{4}$/.test(req._parsedUrl.search)){
        var dotId=req._parsedUrl.search.substring(7);
        var answer={};
        mongoClient.connect('mongodb://localhost:27017/watching',function(err,db){
            if(err){
                db.close(true,function(err,result){
                    if(!err){
                        answer.status=false;
                        answer.message='This is the error of "connect to watching"!';
                        res.render('records',answer);
                    }
                })
            }else{
                db.collection('records',function(err,collection){
                    if(err){
                        answer.status=false;
                        answer.message='This is the error of "connect to records collection"!';
                        res.render('records',answer);
                    }else{
                        collection.find({dotId:dotId}).toArray(function(err,results){
                            if(results.length){
                                answer.status=true;
                                answer.results=results[0];
                                res.render('records',answer);
                            }else{
                                answer.status=true;
                                answer.message='no records!';
                                res.render('records',answer);
                            }
                        })
                    }
                })
            }
        })
    }

})
exports.router=router;