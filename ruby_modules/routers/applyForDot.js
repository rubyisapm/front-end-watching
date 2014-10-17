/**
 * Created by ruby on 2014/9/24.
 */
var queryString=require("querystring");
var mongodb=require("mongodb");
var mongoClient=mongodb.MongoClient;
var crypto=require('crypto');
var express=require('express');
var router=express.Router();

router.use(function(req,res){
    var postData="";
    req.on('data',function(data){
        postData+=data;
    })
    req.on('end',function(){
        mongoClient.connect('mongodb://localhost:27017/watching',function(err,db){
            db.collection('dots',function(err,collection){
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
                    var dataToInsert=queryString.parse(postData);
                    var token;
                    var date=new Date();
                    var month=date.getMonth()+1;
                    var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
                    var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
                    var simpleDate=date.getFullYear()+"-"+month+"-"+date.getDate()+" "+date.getHours()+":"+minutes+":"+seconds;
                    dataToInsert.addTime=simpleDate;
                    dataToInsert.addTimeStr=Math.round(date.getTime()/1000);
                    crypto.randomBytes(2, function(ex, buf) {
                        token = buf.toString('hex');
                        dataToInsert.dotId=token;
                        collection.find({elementId:dataToInsert.elementId,pageId:dataToInsert.pageId}).toArray(function(err,results){
                            if (!err) {
                                if (!results.length) {
                                    collection.insert(dataToInsert, function (err, doc) {
                                        if (!err) {
                                            var answer={
                                                status:true,
                                                message:'The data you send was inserted to Dots.'
                                            }
                                            res.send(answer);
                                        } else {
                                            var answer={
                                                status:false,
                                                message:'This is the error of "insert data to Dots".'
                                            }
                                            res.send(answer);
                                        }
                                    })
                                } else {
                                    var answer={
                                        status:'warn',
                                        message:'This element has dotId yet, the dotId is: ' + results[0].dotId+'.'
                                    }
                                    res.send(answer);
                                }
                            } else {
                                var answer={
                                    status:false,
                                    message:'This is the error of "find data from the dots".'
                                }
                                res.send(answer);
                            }
                        })
                    });

                }

            })
        })
    });
})
exports.router=router;