/**
 * Created by ruby on 2014/7/31.
 */
var http=require("http");
var queryString=require("querystring");
var mongodb=require("mongodb");
var mongoClient=mongodb.MongoClient;
var Db=mongodb.Db;
var crypto=require('crypto');

var server=http.createServer(function(req,res){
    if("/applyForDot"==req.url && 'POST'==req.method){
        var postData='';
        /*req.setEncoding('uft8');*/
        req.on('data',function(data){
            postData+=data;
        })
        req.on('end',function(){
            res.writeHead(200,{
                'Content-type':'text-html;charset=uft-8'
            });
            res.write('You submitted this: '+postData+', the data you send will be sent to mongoDB.<br/>');
            mongoClient.connect('mongodb://localhost:27017/watching',function(err,db){
                db.collection('dots',function(err,collection){
                    if(!err){
                        var dataToInsert=queryString.parse(postData);
                        var token;
                        crypto.randomBytes(2, function(ex, buf) {
                            token = buf.toString('hex');
                            dataToInsert.dotId=token;
                            collection.find({eleId:dataToInsert.eleId,pageId:dataToInsert.pageId}).toArray(function(err,results){
                                if (!err) {
                                    if (!results.length) {
                                        collection.insert(dataToInsert, function (err, doc) {
                                            if (!err) {
                                                res.write('The data you send was inserted to Dots.<br/>');
                                            } else {
                                                res.write('This is the error of "insert data to Dots".<br/>');
                                            }
                                        })
                                    } else {
                                        res.write('This element has dotId yet, the dotId is: ' + results[0].dotId+'.<br/>');
                                    }
                                } else {
                                    res.write('This is the error of "find data from the dots".<br/>');
                                }
                            })
                        });

                    }else{
                        res.write('Can\'t connect to the Dots.');
                    }

                })
            })
        })
    }else if("/submitInfo"==req.url && 'POST'==req.method){
        var postData='';
        req.setEncoding("utf8");
        req.on('data',function(data){
            postData=data;
        });
        req.on('end',function(){
            res.writeHead(200,{
                "Content-type":"text-html;charset=utf-8"
            });
            res.write('You submitted this: '+postData+", the data you send will be sent to mongoDB");
            mongoClient.connect("mongodb://localhost:27017/watching",function(err,db){
                if(err){
                   console.log(err);
                }else{
                    db.collection("records",function(err,collection){
                        if(!err){
                            var dataToInsert=queryString.parse(postData),
                                dotId=dataToInsert.dotId,
                                time=new Date(),
                                userId=dataToInsert.userId;
                            /*Find the dot from the Records,if it isn't in the collection,insert a new data*/
                            collection.find({dotId:dotId}).toArray(function(err,results){
                                if(!err){
                                    if(!results.length){

                                        /*can't find the dot, insert a new data*/
                                        collection.insert({dotId:dotId,operations:[{time:{userId:userId,time:time}}]},function(err,doc){
                                            if(!err){
                                                res.write('The data you sent was inserted to the Operations.<br/>');
                                            }else{
                                                res.write('This is the error of "insert data to the Operations".<br/>');
                                            }
                                        })
                                    }else{
                                        /*find out the dot, update it*/
                                        collection.update({dotId:dotId},{$push:{operations:{time:{userId:userId,time:time}}}},function(err,result){
                                            if(!err){
                                                res.write('The data you sent was updated to the Operations.<br/>');
                                            }else{
                                                res.write('This is the error of "update data to the Operations".<br/>');
                                            }
                                        })
                                    }
                                }else{
                                    console.log('This is the error of "find dot from the Records".<br/>');
                                }
                            });
                        }
                    })
                }
            })
            res.end();
        });
    }
}).listen(3000);




