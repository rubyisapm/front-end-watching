/**
 * Created by ruby on 2014/7/31.
 */
var http=require("http");
var eventEmitter=require('events').EventEmitter;
var queryString=require("querystring");
var server=http.createServer(function(req,res){
    if("/"==req.url){
        res.writeHead(200,{
            "Content-type":"text-html;charset=utf-8"
        });
        res.end([
            '<form>'
            ,'<label for="dotId">dotId: </label>'
            ,'<input type="text" name="dotId"/>'
            ,'<label for="dotDesc">dotDesc: </label>'
            ,'<input type="text" name="dotDesc"/>'
            ,'<label for="time">time: </label>'
            ,'<input type="text" name="time"/>'
            ,'<input type="submit" value="submit" id="submit"/>'
            ,'</form>'
            ,'<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.min.js"></script>'
            ,'<script type="text/javascript">'
            ,'$(function(){'+
                'console.log(2);'+
                /*'$("#submit").click(function(){' +
                    'console.log(2);'+
                    '$.ajax({' +
                    '       type:"POST",' +
                    '       url:http://localhost:8001/submitInfo,' +
                    '       async:false,' +
                    '       data:{dotId:$("input[name=\'dotId\']").val(),dotDesc:$("input[name=\'dotDesc\']").val(),time:$("input[name=\'time\']").val()},' +
                    '       dataType:"json",'+
                    '       success:function(data){' +
                    '           console.log(data);' +
                    '       }' +
                    '})' +
                '})'+*/
            '})'
        ].join(''));
    }else if("/submitInfo"==req.url && 'POST'==req.method){
        var postData='';
        req.on('data',function(data){
            postData=data;
        });
        req.on('end',function(){
            res.writeHead(200,{
                "Content-type":"text-html;charset=utf-8"
            });
            res.write('You submitted this: '+postData);
            res.end();
        });

    }
}).listen(8001);
/*
server.on("connection",function(socket){
    console.log("hello");
})
server.listen(8001);
*/




