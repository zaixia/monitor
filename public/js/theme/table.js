/**
 * Created by Lenovo on 2016/11/21.
 */
function makeTable(divID,thead_data,tbody_data){

    /*每个函数都会有一个参数，传递div的ID，函数中的内容，不管
    * 是图表，表格等，都被加载到这个div中*/
    var tableContainer = '<table class="'+divID+' cas-table"><table>';
    /*在initApp中的<div class="cas-chart-container">块内加入表格*/
    $("#"+divID).append(tableContainer);

    /*实现表格thead*/
    var tableTh ="";
    for(var i = 0 ;i<thead_data.length;i ++){
        tableTh += '<th><span class="glyphicon"></span>'+thead_data[i]+'</th>';
    };
    var tableThead = '<thead><tr>'+tableTh+'</tr></thead>';
    $("."+divID).append(tableThead);

    /*实现表格tbody*/
    var tableTbodyTd = "";
    var tableTbodyTr = "";
    /*table中tbody中tr的循环*/
    for(var j = 0 ;j<tbody_data.length; j ++){
        /*table中tbody中tr中的td循环*/
        tableTbodyTd = "";
        for(var k = 0; k<tbody_data[j].length; k ++){
            tableTbodyTd += '<td>'+tbody_data[j][k]+'</td>'
        };
            tableTbodyTr += '<tr>'+tableTbodyTd+'</tr>';
    }
    var tableTB = '<tbody>'+tableTbodyTr+'</tbody>';
    $("."+divID).append(tableTB);

}