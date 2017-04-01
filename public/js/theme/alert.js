/**
 * Created by Lenovo on 2016/11/21.
 */
function makeAlert(divID,series_data){
    var alertContainer = '<div class="cas-panel-body overflowY alertListInfo"><div>';
    $("#"+divID).append(alertContainer);

    for(var i = 0 ;i<series_data.length;i ++){
        var listInfo =
            '<div class="cas-infoItem">'+
                '<div>'+
                    '<span class="glyphicon glyphicon-heart"></span>'+
                    '<span class="stateIssue">Issue</span>'+
                    '<span class="cas-float-right">'+series_data[i].time+'</span>'+
                '</div>'+
                '<p><span class="glyphicon glyphicon-th-list">&nbsp;</span><span><i>图表组：</i>'+series_data[i].groupName+'<span></p>'+
                '<p><span class="glyphicon glyphicon-stats">&nbsp;</span><span><i>图表名：</i>'+series_data[i].meterTitle+'</span></p>'+
                '<p><span class="glyphicon glyphicon-info-sign">&nbsp;</span><span><i>报警问题：</i>'+series_data[i].alertInfo+'</span></p>'+
            '</div>';
        $(".alertListInfo").append(listInfo);
    };

}