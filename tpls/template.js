/**
 * Created by ruby on 2014/10/16.
 */
function template(tpl,data){
    return template[tpl](data);
}
template.dots=function(data){
    var str='';
    if(data.results){
        var results=data.results;
        for(var i in results){
            str+='<tr>'+
                    '<td>'+results[i].dotId+'</td>'+
                    '<td>'+results[i].elementId+'</td>'+
                    '<td>'+results[i].pageId+'</td>'+
                    '<td>'+results[i].addTime+'</td>'+
                    '<td>'+results[i].dotDesc+'</td>'+
                    '<td>'+
                    '<a class="button mr10 delete">delete</a>'+
                    '<a href="/records?dotId='+results[i].dotId+'" target="_blank" class="button">records</a>'+
                    '</td>'+
                '</tr>';
        }
    }else{
        str+='<tr>'+
                '<td colspan="6">'+
                    data.message+
                '</td>'+
            '</tr>';
    }
    return str;
}