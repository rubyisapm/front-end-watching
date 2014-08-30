/**
 * Created by ruby on 2014/7/31.
 */
var http=require("http");
var queryString=require("querystring");
var mongodb=require("mongodb");
var mongoClient=mongodb.MongoClient;
var Db=mongodb.Db;
var server=http.createServer(function(req,res){
    if("/"==req.url){
        res.writeHead(200,{
            "Content-type":"text-html;charset=utf-8"
        });
        res.end([
            '<form method="POST" action="/submitInfo">'
            ,'<label for="dotId">dotId: </label>'
            ,'<input type="text" name="dotId"/>'
            ,'<label for="dotDesc">dotDesc: </label>'
            ,'<input type="text" name="dotDesc"/>'
            ,'<label for="time">time: </label>'
            ,'<input type="text" name="time"/>'
            ,'<input type="submit" value="submit" id="submit"/>'
            ,'</form>'
            ,'<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.min.js"></script>'
        ].join(''));
    }else if("/submitInfo"==req.url && 'POST'==req.method){
        var postData='';
        req.setEncoding("utf-8");
        req.on('data',function(data){
            postData=data;
        });
        req.on('end',function(){
            res.writeHead(200,{
                "Content-type":"text-html;charset=utf-8"
            });
            res.write('You submitted this: '+postData+", the data you send will be sent to mongoDB");
            mongoClient.connect("mongodb://localhost:27017/dots",function(err,db){
                if(err){
                   console.log(err);
                }else{
                    db.createCollection("dotInfo",function(err,collection){
                        if(!err){
                            /*change the time to the current time*/
                            var dataToInsert=queryString.parse(postData);
                            dataToInsert.time=new Date();
                            collection.insert(dataToInsert,function(err,doc){
                                if(err){
                                    console.log(err);
                                }else{
                                    collection.find().toArray(function(err,result){
                                        res.write("This is the data you inserted to the mongodb: "+result);
                                    })
                                }

                            })
                        }
                    })
                }
            })
            res.end();
        });
    }else if(req.url=="/applyDot"){

    }
}).listen(8001);




