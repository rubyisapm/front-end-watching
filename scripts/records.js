/**
 * Created by ruby on 2014/9/21.
 */
$(function(){
    var param={
        dotId:window.location.search.substring(5)
    }
    $.ajax({
        url:'/recordsOfDot',
        method:'POST',
        dataType:'json',
        contentType:'json',
        data:param,
        success:function(data){
            if(data.status){
                var str='';
                if(data.results){
                    var operations=data.results.operations;
                    for(var i in operations){
                        str+='<tr>'+
                            '<td>'+operations[i].time.userId+'</td>'+
                            '<td>'+operations[i].time.time+'</td>'+
                            '</tr>';
                    }
                }else{
                    str+='<tr><td colspan="2">'+data.message+'</td></tr>';
                }
                $('table').append(str);
            }else{
                alert(data.message);
            }
        },
        error:function(){
            alert('请求出错！');
        }
    })
})

