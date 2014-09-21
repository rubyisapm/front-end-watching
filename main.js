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
app.get("/apply",function(req,res){
    res.render("apply.ejs",{options:["首页","产品介绍页","帮助中心"]});
});
app.get("/submit",function(req,res){
    res.render('submit.ejs');
});
app.post("/applyForDot",function(req,res){
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
});
app.post("/submitInfo",function(req,res){
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
                                                            collection.insert({dotId:dotId,operations:[{time:{userId:userId,time:time}}]},function(err,doc){
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
                                                            collection.update({dotId:dotId},{$push:{operations:{time:{userId:userId,time:time}}}},function(err,result){
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
});
app.get("/dots",function(req,res){
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
                            if(results.length>0){
                                data.status=true;
                                data.results=results;
                                res.render('dots.ejs',data);
                            }else{
                                data.status=true;
                                data.results=results;
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

});
app.post('/deleteDot',function(req,res){
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
                            var answer={
                                status:true,
                                message:'The dot was deleted!'
                            }
                            res.send(answer);
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
app.listen("3000");