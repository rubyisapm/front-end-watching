/**
 * Created by ruby on 2014/9/19.
 */
$(function(){
    $("#submit").on("click",function(){
        var dotId=$("#dotId").val();
        var userId=$("#userId").val();
        if(dotId==""){
            $("#note").html('<b class="message_error"></b>Please input dotId!');
            return;
        }
        if(userId==""){
            $("#note").html('<b class="message_error"></b>Please input userId!').show();
        }
        var param={
            dotId:dotId,
            userId:userId
        }

        $.ajax({
            url:"/submitInfo",
            method:"POST",
            dataType:"json",
            contentType:"json",
            data:param,
            success:function(data){
                var message="";
                if(data.status=="warn"){
                    message='<b class="message_warn"></b>'+data.message;
                }else if(data.status){
                    message='<b class="message_success"></b>'+data.message;
                }else if(!data.status){
                    message='<b class="message_error"></b>'+data.message;
                }
                $("#note").html(message).show();
            },
            error:function(){
                console.log('This is the error of "ajax request"');
            }
        })
    })

    $("input").on("focus",function(){
        $("#note").hide();
    })
})