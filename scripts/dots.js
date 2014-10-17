/**
 * Created by ruby on 2014/9/20.
 */
$(function(){
    $("#searchBtn").on('click',function(){
        var param={};
        if(/^\s+$/.test($('#elementId').val())){
            param.elementId=$('#elementId').val();
        }
        if($('#pageId').val()!=0){
            param.pageId=$('#pageId').val();
        }
        if(/^\s+$/.test($('#addTime').val())){
            param.addTime=$('#addTime').val();
        }
        if(param.elementId)
        $.ajax({
            url:'/searchDot',
            type:'POST',
            dataType:'json',
            contentType:'json',
            data:param,
            success:function(data){
                if(data.status){
                    $('#dots tbody').html(template('dots',data.results));
                }else{
                    alert(data.message);
                }
            },
            error:function(){
                alert('Error!!');
            }
        })
    })

    $('.delete').on('click',function(){
        var tr=$(this).parents('tr');
        var param={
            dotId:tr.find('td:first').html()
        }
        $.ajax({
            url:'/deleteDot',
            type:'POST',
            dataType:'json',
            contentType:'json',
            data:param,
            success:function(data){
                if(data.status){
                    tr.remove();
                    alert(data.message);
                }
            },
            error:function(){
                alert('Error!');
            }
        })
    })


})
