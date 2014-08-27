/**
 * Created by ruby on 2014/7/31.
 */
var http=require("http");
var eventEmitter=require('events').EventEmitter;
var queryString=require("querystring");
var server=http.createServer(function(req,res){
    var postData="";
    req.setEncoding='uff-8';
    res.writeHead(200,{
        "Content-type":"text/html;charset=utf-8"
    })
    req.on('data',function(data){
        postData+=data;
    })
    res.write('<form action="locahost:8001/" method="post"><input type="text"/><input type="submit" value="submit"/></form>');
    req.on("end",function(){
        console.log(postData);
        res.end(postData);
    })
}).listen(8001);
/*
server.on("connection",function(socket){
    console.log("hello");
})
server.listen(8001);
*/




