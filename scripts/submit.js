/**
 * Created by ruby on 2014/9/19.
 */
$(function(){
    $("#submit").on("click",function(){
        var dotId=$("#dotId").val();
        var userId=$("#userId").val();
        var param={
            dotId:dotId,
            userId:userId
        }
        $.ajax({
            url:"/applyForDot",
            method:"POST",
            dataType:"html",
            contentType:"json",
            data:param,
            success:function(data){
                $("#note").html(data);
            },
            error:function(){
                console.log("error");
            }
        })
    })

})