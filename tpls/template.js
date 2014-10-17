/**
 * Created by ruby on 2014/10/16.
 */
function template(tpl,data){
    return template[tpl](data);
}
template.dots=function(data){
    var str='';

    for(var i in data){
        str+='<tr>'+
                '<td>'+data[i].dotId+'</td>'+
                '<td>'+data[i].elementId+'</td>'+
                '<td>'+data[i].pageId+'</td>'+
                '<td>'+data[i].addTime+'</td>'+
                '<td>'+data[i].dotDesc+'</td>'+
                '<td>'+
                    '<a class="button mr10 delete">delete</a>'+
                    '<a href="/records?dotId='+data[i].dotId+'" target="_blank" class="button">records</a>'+
                '</td>'+
            '</tr>';
    }
    return str;
}