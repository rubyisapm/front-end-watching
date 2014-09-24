/**
 * Created by ruby on 2014/9/24.
 */
var queryString=require('querystring');
var mongodb=require("mongodb");
var mongoClient=mongodb.MongoClient;
var express=require('express');
var router=express.Router();
router.use(function(req,res){
    var postData="";
    req.on('data',function(data){
        postData+=data;
    });
    req.on('end',function(){
        var dataToDelete=queryString.parse(postData);

        mongoClient.connect('mongodb://localhost:27017/watching',function(err,db){
            if(err){
                db.close(true,function(err,result){
                    if(!err){
                        var answer={
                            status:false,
                            message:'This is the error of "connect to watching"!'
                        }
                        res.send(answer);
                    }
                })
            }else{
                db.collection("dots",function(err,collection){
                    collection.remove({dotId:dataToDelete.dotId},function(err,doc){
                        if(!err){
                            db.collection('records',function(err,collection){
                                collection.remove({dotId:dataToDelete.dotId},function(err,doc){
                                    if(!err){
                                        var answer={
                                            status:true,
                                            message:'The dot and the records concerned was deleted!'
                                        }
                                        res.send(answer);
                                    }else{
                                        var answer={
                                            status:false,
                                            message:'This is the error of "delete the records concerned"!'
                                        }
                                    }
                                })
                            })
                        }else{
                            var answer={
                                status:false,
                                message:'This is the error of "delete the dot"!'
                            }
                            res.send(answer);
                        }
                    })
                })
            }
        })
    })

})
exports.router=router;