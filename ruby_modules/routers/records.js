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
        var data={};
        mongoClient.connect('mongodb://localhost:27017/watching',function(err,db){
            if(err){
                db.close(true,function(err,result){
                    if(!err){
                        data.status=false,
                            data.message='This is the error of "connect to watching"!';
                        res.render('records',data);
                    }
                })
            }else{
                db.collection('records',function(err,collection){
                    if(err){
                        data.status=false;
                        data.message='This is the error of "connect to records collection"!';
                        res.render('records',data);
                    }else{
                        collection.find({dotId:dotId}).toArray(function(err,results){
                            if(results.length){
                                data.status=true;
                                data.results=results[0];
                                res.render('records',data);
                            }else{
                                data.status=true;
                                data.message='no records!';
                                res.render('records',data);
                            }
                        })
                    }
                })
            }
        })
    }

})
exports.router=router;