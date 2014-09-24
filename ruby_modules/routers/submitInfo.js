/**
 * Created by ruby on 2014/9/24.
 */
var queryString=require("querystring");
var mongodb=require("mongodb");
var mongoClient=mongodb.MongoClient;
var express=require('express');
var router=express.Router();
router.use(function(req,res){
    var postData='';
    req.setEncoding("utf8");
    req.on('data',function(data){
        postData=data;
    });
    req.on('end',function(){
        mongoClient.connect("mongodb://localhost:27017/watching",function(err,db){
            var dataToInsert=queryString.parse(postData),
                dotId=dataToInsert.dotId,
                time=new Date(),
                userId=dataToInsert.userId;
            if(err){
                db.close(true,function(err,result){
                    if(!err){
                        var answer={
                            status:false,
                            message:'This is an error of "connect to watching"!'
                        }
                        res.send(answer);
                    }
                });
            }else{
                /*first check out whether the dot exists or not, this just for test environment*/
                db.collection('dots',function(err,collection){
                    if(!err){
                        collection.find({dotId:dotId}).toArray(function(err,results){
                            if(!err){
                                if(results.length){
                                    db.collection("records",function(err,collection){
                                        if(!err){

                                            /*Find the dot from the Records,if it isn't in the collection,insert a new data*/
                                            collection.find({dotId:dotId}).toArray(function(err,results){
                                                if(!err){
                                                    if(!results.length){
                                                        /*can't find the dot, insert a new data*/
                                                        collection.insert({dotId:dotId,operations:[{userId:userId,time:time}]},function(err,doc){
                                                            if(!err){
                                                                var answer={
                                                                    status:true,
                                                                    message:'The data you sent was inserted to the Operations.'
                                                                }
                                                                res.send(answer);
                                                            }else{
                                                                var answer={
                                                                    status:false,
                                                                    message:'This is the error of "insert data to the Operations".'
                                                                }
                                                                res.send(answer);
                                                            }
                                                        })
                                                    }else{
                                                        /*find out the dot, update it*/
                                                        collection.update({dotId:dotId},{$push:{operations:{userId:userId,time:time}}},function(err,result){
                                                            if(!err){
                                                                var answer={
                                                                    status:true,
                                                                    message:'The data you sent was updated to the Operations.'
                                                                }
                                                                res.send(answer);
                                                            }else{
                                                                var answer={
                                                                    status:false,
                                                                    message:'This is the error of "update data to the Operations".'
                                                                }
                                                                res.send(answer);
                                                            }
                                                        })
                                                    }
                                                }else{
                                                    var answer={
                                                        status:false,
                                                        message:'This is the error of "find dot from the Records".'
                                                    }
                                                    res.send(answer);
                                                }
                                            });
                                        }
                                    })
                                }else{
                                    var answer={
                                        status:false,
                                        message:'The dot you operated has not in the db yet, please apply for dotId first!'
                                    }
                                    res.send(answer);
                                }
                            }
                        })
                    }else{
                        var answer={
                            status:false,
                            message:'This is the error of "check out whether the dot exists or not"!'
                        }
                        res.send(answer);
                    }
                })
            }
        })
    });
})
exports.router=router;