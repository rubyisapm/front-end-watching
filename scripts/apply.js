/**
 * Created by ruby on 2014/9/19.
 */
$(function(){
    $("#submit").on("click",function(){
        var elementId=$("#elementId").val();
        var pageId=$("#pageId").val();
        var dotDesc=$("#dotDesc").val();
        if(elementId==""){
            $("#note").html('<b class="message_error"></b>Please input elementId!').show();
            return;
        }
        if(dotDesc==""){
            $("#note").html('<b class="message_error"></b>Please input dotDesc!').show();
            return;
        }
        var param={
            elementId:elementId,
            pageId:pageId,
            dotDesc:dotDesc
        }

        $.ajax({
            url:"/applyForDot",
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
                }else if(data.status){
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