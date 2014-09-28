/**
 * Created by ruby on 2014/9/24.
 */
var mongodb=require("mongodb");
var mongoClient=mongodb.MongoClient;
var express=require('express');
var router=express.Router();
router.use(function(req,res){
    var data={};
    mongoClient.connect("mongodb://localhost:27017/watching",function(err,db){
        if(err){
            db.close(true,function(err,result){
                if(!err){
                    data.status=false,
                        data.message='This is the error of "connect to watching"!';
                    res.render('dots.ejs',data);
                }
            })
        }else{
            db.collection('dots',function(err,collection){
                if(!err){
                    collection.find().toArray(function(err,results){
                        if(!err){
                            if(results.length){
                                data.status=true;
                                data.results=results;
                                res.render('dots.ejs',data);
                            }else{
                                data.status=false;
                                data.message='no dot!';
                                res.render('dots.ejs',data);
                            }
                        }else{
                            data.status=false;
                            data.message='This is the error of "change results to Array"!';
                            res.render('dots.ejs',data);
                        }
                    })
                }else{
                    data.status=false;
                    data.message='This is the error of "use the collection dots"!';
                    res.render('dots.ejs',data);
                }
            })
        }
    })

})
exports.router=router;