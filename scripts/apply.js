/**
 * Created by ruby on 2014/9/19.
 */
$(function(){
    $("#submit").on("click",function(){
        var elementId=$("#elementId").val();
        var pageId=$("#pageId").val();
        var dotDesc=$("#dotDesc").val();
        var param={
            elementId:elementId,
            pageId:pageId,
            dotDesc:dotDesc
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