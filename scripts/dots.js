/**
 * Created by ruby on 2014/9/20.
 */
$(function(){

    $('.delete').on('click',function(){
        var tr=$(this).parents('tr');
        var param={
            dotId:tr.find('td:first').html()
        }
        $.ajax({
            url:'/deleteDot',
            method:'POST',
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
