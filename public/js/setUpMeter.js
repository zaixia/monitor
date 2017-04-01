/**
 * Created by Wubin on 2016/12/5.
 */
import { dashboardGroupLcaltion,getDashboardLocation} from './dashboardEdit';
import { queryToData,getConstantData } from './queryToData';
import { makeMeter } from './makeMeter';
import { updateStyleData,fetchValue } from './editMeter'


require('jquery-ui');
require('jquery-ui.css');
require('evol-colorpicker');
require('evol-colorpicker/css/evol-colorpicker.css');

require('spectrum-colorpicker');

//获取全局变量g_url_data
import { g_url_data } from './global_value';
var url = g_url_data;


var page;
//保存用户编辑后的样式数据
var meterStyle;

/*图表修改设定,图表显示,模态框中展示仪表和修改仪表样式*/
/*查询语句序号数组，一个保存没用过的序号，一个保存用过的序号*/
var querySeqs = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];    //先不考虑超过26条的情况
var querySeqExists = [];
var queryArray = [];                          //查询语句
var queryInfoArray = [];                      //查询语句变量信息
var databaseSelect;                           //选择的数据库
var serverSource = "192.168.1.79";            //数据库所在主机ip
var databasePort = "8086";                    //端口
var isEdit = 0;


/*还原查询语句方法*/
function showExistsQuery(data) {
    /*还原查询语句*/
    var dashboard = data.dashboardArray;
    var dashboardGroupIndex = window.localStorage.getItem("dashboardGroupIndex");
    var dashboardIndex = window.localStorage.getItem("dashboardIndex");
    var queryAppend ="";
    var sqlArray = dashboard[dashboardGroupIndex].meters[dashboardIndex].data;
    var Roperator =  '<select >' +           //关系运算符选项
        '<option>=</option>'+
        '<option>!=</option>'+
        '</select>';
    for(var i=0;i<sqlArray.length;i++) {
        var condition = "";
        var measurementsList = "";
        $.ajax({
            url:"http://"+sqlArray[i].queryInfo.serverSource+":"+sqlArray[i].queryInfo.port+"/query?q=SHOW+MEASUREMENTS&db="+sqlArray[i].queryInfo.database,
            type:"GET",
            async:false,
            success:function (data) {
                for(var m=0;m<data.results[0].series[0].values.length;m++) {
                    if(data.results[0].series[0].values[m][0] == sqlArray[i].queryInfo.measurements) {
                        measurementsList = measurementsList + "<option selected='selected'>"+sqlArray[i].queryInfo.measurements+"</option>";
                    }else{
                        measurementsList = measurementsList + "<option>"+ data.results[0].series[0].values[m][0]+"</option>";
                    }
                }
                measurementsList = "<select class='selectMeasurement'>"+measurementsList+"</select>";
            },
            error:function () {
                console.log("数据获取失败");
            }
        });
        var k = 0;
        for(var j in sqlArray[i].queryInfo.tagKeysValue) {
            var conditionValue = "";
            $.ajax({
                url:"http://"+sqlArray[i].queryInfo.serverSource+":"+sqlArray[i].queryInfo.port+"/query?q=SHOW+TAG+VALUES+FROM+%22"+
                sqlArray[i].queryInfo.measurements+"%22+WITH+KEY+%3D+%22"+j+"%22&db="+sqlArray[i].queryInfo.database,
                type:"GET",
                async:false,
                success:function (data) {
                    for(var tv=0;tv<data.results[0].series[0].values.length;tv++){
                        if(data.results[0].series[0].values[tv][1] == sqlArray[i].queryInfo.tagKeysValue[j]) {
                            conditionValue = conditionValue + "<option selected='selected'>"+sqlArray[i].queryInfo.tagKeysValue[j]+"</option>";
                        }else {
                            conditionValue = conditionValue + "<option>"+ data.results[0].series[0].values[tv][1] + "</option>";
                        }
                    }
                },
                error:function () {
                    console.log("获取数据失败！！！");
                }
            });
            if(k == 0) {
                condition = condition + '<span class="conditonFirst">' +
                    '<select class="sqlCondition">' + '<option>'+j+'</option>'+'<option>删除条件</option>'+'</select>'+Roperator+ '<select>'+conditionValue+'</select>'+
                    '</span>';
            }else {
                condition = condition +'<span class="conditonExistence">' +
                    '<span class="sql-label">AND</span>'+
                    '<select class="sqlCondition">'+
                    '<option>'+j+'</option>'+'<option>删除条件</option>'+ '</select>'+Roperator+ '<select>'+conditionValue+'</select>'+
                    '</span>';
            }
            k++;
        }
        queryAppend = queryAppend + '<div class="cas-tabPanel" id="' + sqlArray[i].queryInfo.queryInfoSeq + '">'+
            '<span class="glyphicon sql-icon">'+sqlArray[i].queryInfo.queryInfoSeq+'</span>'+
            '<span class="sql-label ">select</span>'+
            '<select class="selectResult">' +
            '<option selected="selected">value</option>'+
            '<option>function</option>'+
            '</select>'+
            '<span class="sql-label ">from</span>'+ measurementsList +
            '<span class="sql-label selectCondition">where</span>'+
            condition+
            '<span class="glyphicon glyphicon-plus sql-icon sql-add-condition" id="plusID"></span>'+
            '<div class="pull-right">'+
            '<span class="glyphicon glyphicon-arrow-up sql-icon"></span><span class="glyphicon glyphicon-arrow-down sql-icon"></span><span class="glyphicon glyphicon-remove sql-icon sql-item-remove"></span>'+
            '</div>'+
            '</div>';
    }
    return queryAppend;
    //window.localStorage.setItem("queryAppend",queryAppend);
}

var body;

/*图表修改设定,图表显示,模态框中展示仪表和修改仪表样式*/
$("body").on('click','.cas-title-cog',function() {
    /*获取父页面的仪表盘ID*/
    var dashboardGroupID = $(this).parent().parent().parent().attr("class").split(" ")[1];
    var dashboardID = $(this).parent().next().children().eq(0).attr("id");
    /*跨页面传值*/
    window.localStorage.setItem("dashboardGroupID", dashboardGroupID);                                          //仪表所在仪表组ID
    window.localStorage.setItem("dashboardID", dashboardID);                                                    //仪表ID
    window.localStorage.setItem("dashboardGroupIndex",dashboardGroupLcaltion(dashboardGroupID));                //仪表组位置
    window.localStorage.setItem("dashboardIndex",getDashboardLocation(dashboardID));


    //从数据库中获得仪表的样式数据
    var meterType;
    var init_meterStyle;
    $.ajax({
        url: '/getThisMeterStyle',
        type:"GET",
        async : false,
        data : {
            meter_id:dashboardID,
            rowList: dashboardGroupID
        },
        dataType:'json',
        success:function(data){
            init_meterStyle=data.styleData;
            meterType=data.meterType;

        },
        error: function (err) {
            console.log(err);

        }

    });
    switch (meterType){
        case'unitvalue' :
            page='./moduleUnitValue.html';
            break;
        case'bar' :
            page='./moduleBar.html';
            break;
        case'radar':
            page='./moduleRadar.html';
            break;
        case'pie':
            page='./modulePie.html';
            break;
        case'line':
            page='./moduleLine.html';
            break;
        case'3Dpie':
            page='./module3DPie.html';
            break;
        case'3Dbar':
            page='./module3DBar.html';
            break;
        case'heatmap':
            page='./moduleHeatMap.html';
            break;
        default:
    }
    window.localStorage.setItem("page",page);



    var index = top.layer.open({
        type: 2,
        title:'图表设置',
        area: ['1000px', '800px'], //宽高
        maxmin: true,
        content: page,
        success: function(layero, index){
            body = layer.getChildFrame('body', index);

            switch(page){
                case'./moduleUnitValue.html' :
                    body.find('#titleSize').val(init_meterStyle.textSize[0]);
                    body.find('#titleWeight').val(init_meterStyle.textWeight[0]);
                    body.find('#in_R').val(init_meterStyle.otherParams.pie_radius[0]);
                    body.find('#out_R').val(init_meterStyle.otherParams.pie_radius[1]);
                    //加载颜色选择器
                    body.find("#titleColor").colorpicker({
                        color: init_meterStyle.textColor[0],
                        defaultPalette: 'web',
                        hideButton: true,
                        strings : "分类选择,标准颜色,调色盘,分类选择,返回调色盘,选择历史,没有选择历史"
                    });
                    body.find("#areaColor").colorpicker({
                        color: init_meterStyle.areaStyle.color,
                        defaultPalette: 'web',
                        hideButton: true,
                        strings : "分类选择,标准颜色,调色盘,分类选择,返回调色盘,选择历史,没有选择历史"
                    });

                    break;
                case'./moduleBar.html' :
                    body.find("#legendColor").colorpicker({
                        color: init_meterStyle.textColor[1],
                        defaultPalette: 'web',
                        hideButton: true,
                        strings : "分类选择,标准颜色,调色盘,分类选择,返回调色盘,选择历史,没有选择历史"
                    });

                    body.find('#legendSize').val(init_meterStyle.textSize[1]);
                    body.find('#textWidth').val(init_meterStyle.textWeight[1]);
                    body.find('#areaOpacity').val(init_meterStyle.areaStyle.opacity);
                    body.find("#backgroundColor").colorpicker({
                        color: init_meterStyle.backgroundColor,
                        defaultPalette: 'web',
                        hideButton: true,
                        strings : "分类选择,标准颜色,调色盘,分类选择,返回调色盘,选择历史,没有选择历史",
                        transparentColor: true
                    });
                    break;
                case'./moduleRadar.html':
                    body.find("#legendColor").colorpicker({
                        color: init_meterStyle.textColor[1],
                        defaultPalette: 'web',
                        hideButton: true,
                        strings : "分类选择,标准颜色,调色盘,分类选择,返回调色盘,选择历史,没有选择历史"
                    });
                    body.find("#nameColor").colorpicker({
                        color: init_meterStyle.textColor[2],
                        defaultPalette: 'web',
                        hideButton: true,
                        strings : "分类选择,标准颜色,调色盘,分类选择,返回调色盘,选择历史,没有选择历史"
                    });

                    body.find('#legendSize').val(init_meterStyle.textSize[1]);
                    body.find('#nameSize').val(init_meterStyle.textSize[2]);
                    body.find('#nameWidth').val(init_meterStyle.textWeight[2]);
                    body.find("#lineColor").colorpicker({
                        color: init_meterStyle.lineStyle.color,
                        defaultPalette: 'web',
                        hideButton: true,
                        strings : "分类选择,标准颜色,调色盘,分类选择,返回调色盘,选择历史,没有选择历史"
                    });
                    body.find('#lineWidth').val(init_meterStyle.lineStyle.width);
                    body.find('#lineStyle').val(init_meterStyle.lineStyle.type);
                    body.find("#areaColor").colorpicker({
                        color: init_meterStyle.areaStyle.color,
                        defaultPalette: 'web',
                        hideButton: true,
                        strings : "分类选择,标准颜色,调色盘,分类选择,返回调色盘,选择历史,没有选择历史"
                    });
                    body.find('#areaOpacity').val(init_meterStyle.areaStyle.opacity);
                    body.find("#backgroundColor").colorpicker({
                        color: init_meterStyle.backgroundColor,
                        defaultPalette: 'web',
                        hideButton: true,
                        strings : "分类选择,标准颜色,调色盘,分类选择,返回调色盘,选择历史,没有选择历史",
                        transparentColor: true
                    });
                    break;
                case'./modulePie.html':
                    body.find("#legendColor").colorpicker({
                        color: init_meterStyle.textColor[1],
                        defaultPalette: 'web',
                        hideButton: true,
                        strings : "分类选择,标准颜色,调色盘,分类选择,返回调色盘,选择历史,没有选择历史"
                    });
                    body.find('#legendSize').val(init_meterStyle.textSize[1]);
                    body.find('#labelSize').val(init_meterStyle.textSize[2]);
                    body.find('#textWidth').val(init_meterStyle.textWeight[1]);
                    body.find('#labelWidth').val(init_meterStyle.textWeight[2]);
                    break;
                case'./moduleLine.html':
                    body.find("#lineWidth").val(init_meterStyle.lineStyle.width);
                    body.find("#isSmooth").val(init_meterStyle.lineStyle.smooth?"true":"false");
                    body.find("#lineStyle").val(init_meterStyle.lineStyle.type);
                    body.find("#lineOpacity").val(init_meterStyle.lineStyle.opacity);
                    body.find("#areaOpacity").val(init_meterStyle.areaStyle.opacity);
                    body.find("#legendColor").colorpicker({
                        color: init_meterStyle.textColor[1],
                        defaultPalette: 'web',
                        hideButton: true,
                        strings : "分类选择,标准颜色,调色盘,分类选择,返回调色盘,选择历史,没有选择历史"
                    });
                    body.find("#legendSize").val(init_meterStyle.textSize[1]);
                    body.find("#textWidth").val(init_meterStyle.textWeight[1]);

                    body.find("#backgroundColor").colorpicker({
                        color: init_meterStyle.backgroundColor,
                        defaultPalette: 'theme',
                        hideButton: true,
                        strings : "分类选择,标准颜色,调色盘,分类选择,返回调色盘,选择历史,没有选择历史",
                        transparentColor: true
                    });


                    break;
                case'./module3DPie.html':
                    body.find("#legendColor").colorpicker({
                        color: init_meterStyle.textColor[1],
                        defaultPalette: 'web',
                        hideButton: true,
                        strings : "分类选择,标准颜色,调色盘,分类选择,返回调色盘,选择历史,没有选择历史"
                    });
                    body.find("#labelColor").colorpicker({
                        color: init_meterStyle.textColor[2],
                        defaultPalette: 'web',
                        hideButton: true,
                        strings : "分类选择,标准颜色,调色盘,分类选择,返回调色盘,选择历史,没有选择历史"
                    });
                    body.find('#legendSize').val(init_meterStyle.textSize[1]);
                    body.find('#labelSize').val(init_meterStyle.textSize[2]);
                    body.find('#legendWidth').val(init_meterStyle.textWeight[1]);
                    body.find('#labelWidth').val(init_meterStyle.textWeight[2]);
                    body.find('#pieDepth').val(init_meterStyle.otherParams.pie_depth);
                    break;
                case'./module3DBar.html':
                    body.find("#legendColor").colorpicker({
                        color: init_meterStyle.textColor[1],
                        defaultPalette: 'web',
                        hideButton: true,
                        strings : "分类选择,标准颜色,调色盘,分类选择,返回调色盘,选择历史,没有选择历史"
                    });
                    body.find('#legendSize').val(init_meterStyle.textSize[1]);
                    break;
                case'./moduleHeatMap.html':
                    body.find("#backgroundColor").colorpicker({
                        color: init_meterStyle.backgroundColor,
                        defaultPalette: 'web',
                        hideButton: true,
                        strings : "分类选择,标准颜色,调色盘,分类选择,返回调色盘,选择历史,没有选择历史",
                        transparentColor: true
                    });

                    let isShow=init_meterStyle.otherParams.label_show===true?"true":"false";
                    body.find('#showLabel').val(isShow);

                    break;


                default:
            }
            
            
            /*请求仪表盘数据查询信息*/
            $.ajax({
                url:url,
                type:"GET",
                async:false,
                success:function (data) {

                    body.find("#tab1").append(showExistsQuery(data));
                },
                error:function () {
                    console.log("数据获取失败！！！");
                }
            });
            /*请求数据库选项*/
            var dbOption = "";
            $.ajax({
                url:"http://"+serverSource+":"+databasePort+"/query?q=SHOW+DATABASES",
                type:"GET",
                async:false,
                success:function (data) {
                    for(var index=0;index<data.results[0].series[0].values.length;index++) {
                        dbOption = dbOption + "<option>"+data.results[0].series[0].values[index][0]+"</option>";
                    }
                    body.find('.selectDatabase').append(dbOption);
                },
                error:function () {
                    console.log("数据获取失败！！！");
                }
            });
        }
    });
  //  top.layer.full(index);//全屏
    
});


/*添加sql语句事件方法*/
function addQuery(elem,querySeq) {
    var optionValue = "";
    $.ajax({
        url: "http://" + serverSource + ":" + databasePort + "/query?q=SHOW+MEASUREMENTS&db=" + databaseSelect,
        type: "GET",
        async: false,
        success: function (data) {
            for (var index = 0; index < data.results[0].series[0].values.length; index++) {
                optionValue = optionValue + '<option>' + data.results[0].series[0].values[index][0] + '</option>';
            }
            optionValue = '<select class="selectMeasurement">' + optionValue + '</select>';
        },
        error: function () {
            console.log("获取数据失败");
        }
    });
    var sql = '<div class="cas-tabPanel" id="' + querySeq + '">' +
        '<span class="glyphicon sql-icon">' + querySeq + '</span>' +
        '<span class="sql-label ">select</span>' +
        '<select class="selectResult">' +
        '<option selected="selected">value</option>' +
        '<option>function</option>' +
        '</select>' +
        '<span class="sql-label ">from</span>' + optionValue +
        '<span class="sql-label selectCondition">where</span>' +
        '<span class="glyphicon glyphicon-plus sql-icon sql-add-condition" id="plusID"></span>' +
        '<div class="pull-right">' +
        '<span class="glyphicon glyphicon-arrow-up sql-icon"></span><span class="glyphicon glyphicon-arrow-down sql-icon"></span><span class="glyphicon glyphicon-remove sql-icon sql-item-remove"></span>' +
        '</div>' +
        '</div>';

    $(elem).parent().parent().append(sql);
}

$("body").on('click','.btn-add-sql',function() {
    if($(".selectDatabase").find("option:selected").text() == "" ) {
        layer.alert("请选择数据库",{icon:7,title:"WARN"});
    }else{
        databaseSelect = $(".selectDatabase").find("option:selected").text();
        var querys = $("#tab1").children();
        if(querys.length > 1) {
            for(var i=1;i<querys.length;i++) {
                for(var j=0;j<querySeqs.length;j++) {
                    if(querySeqs[j] == querys.eq(i).attr("id")) {
                        querySeqs.splice(j,1);
                    }
                }
                querySeqExists.push(querys.eq(i).attr("id"));
            }
            var querySeq = querySeqs[0];
            querySeqExists.push(querySeqs[0]);
            querySeqs.splice(0, 1);
            addQuery(this,querySeq);
        }else {
            /*获取查询语句序号*/
            var querySeq = querySeqs[0];
            querySeqExists.push(querySeqs[0]);
            querySeqs.splice(0, 1);
            addQuery(this,querySeq);
        }
    }
});
/*删除sql语句事件方法*/
$("body").on('click','.sql-item-remove',function() {
    $(this).parent().parent().attr("id");
    var find  = false;
    /*回收查询语句序号*/
    var querys = $("#tab1").children();
    /*先判断仪表盘有没有存在查询语句，若存在就重新初始化序号数组*/
    if(querys.length > 1){
        for(var i=1;i<querys.length;i++) {
            for(var j=0;j<querySeqs.length;j++) {
                if(querySeqs[j] == querys.eq(i).attr("id")) {
                    querySeqs.splice(j,1);
                }
            }
            querySeqExists.push(querys.eq(i).attr("id"));
        }
        /*判断将要删除的语句序号存不存在已有的序号数组中，有则删除，没有就报错*/
        for(var index=0;index<querySeqExists.length;index++) {
            if($(this).parent().parent().attr("id") == querySeqExists[index]) {
                querySeqs.push(querySeqExists[index]);
                querySeqExists.splice(index,1);
                querySeqs.sort();
                find = true;
                break;
            }
        }
        if(find){
            $(this).parent().parent().remove();
        }else {
            layer.alert("删除出现异常，请反馈！！！",{icon:7,title:"WARN"});
        }
    }else {
        for(var index=0;index<querySeqExists.length;index++) {
            if($(this).parent().parent().attr("id") == querySeqExists[index]) {
                querySeqs.push(querySeqExists[index]);
                querySeqExists.splice(index,1);
                querySeqs.sort();
                find = true;
                break;
            }
        }
        if(find){
            $(this).parent().parent().remove();
        }else {
            layer.alert("删除出现异常，请反馈！！！",{icon:7,title:"WARN"});
        }
    }

});

/*添加sql语句中条件选项事件方法*/
$("body").on('click','.sql-add-condition',function() {
    var condtionKey = "";
    var measurement = $(this).parent().children().eq(4).find("option:selected").text();          //!!!
    databaseSelect = $(".selectDatabase").find("option:selected").text();
    $.ajax({
        url:"http://"+serverSource+":"+databasePort+"/query?q=SHOW+TAG+KEYS+FROM+%22"+measurement+"%22&db="+databaseSelect,
        type:"GET",
        async:false,
        success:function (data) {
            for(var index=0;index<data.results[0].series[0].values.length;index++){
                condtionKey = condtionKey + '<option>'+data.results[0].series[0].values[index][0]+'</option>';
            }
        },
        error:function () {
            console.log("数据获取失败！！！");
        }
    });
    /*如果没有选数据库！！！还有BUG*/
    if(databaseSelect == ""){
        condtionKey = condtionKey +'<option>删除条件</option>';
    }
    var sqlItem ='<span class="conditonFirst">' +
        '<select class="sqlCondition">' +
        '<option> </option>'+
        condtionKey +
        '</select>'+
        '</span>';
    var sqlItem2 = '<span class="conditonExistence">' +
        '<span class="sql-label">AND</span>'+
        '<select class="sqlCondition">' +
        '<option> </option>'+
        condtionKey +
        '</select>'+
        '</span>';
    /*添加key名称选项并删除 + 图标事件方法*/
    if($(this).parent().children().eq(5).next().attr("class") == "conditonFirst") {        //!!!
        $(this).before(sqlItem2);
        $(this).remove();
    }else {
        $(this).before(sqlItem);
        $(this).remove();
    }
});

/*给条件赋值、删除条件事件方法*/
$("body").on("change",".sqlCondition",function () {
    if($(this).find("option:selected").text() == "删除条件"){
        if($(this).parent().attr("class") == "conditonFirst") {
            if($(this).parent().next().attr("class") == "conditonExistence") {
                $(this).parent().next().children().eq(0).remove();               //!!!
                $(this).parent().next().attr("class","conditonFirst");
            }
        }
        /*如果没有选择数据库！！！还有BUG*/
        if(databaseSelect == ""){
            $(this).parent().after('<span class="glyphicon glyphicon-plus sql-icon sql-add-condition" id="plusID"></span>');
        }
        $(this).parent().addClass("deleteCondition");
        $(".deleteCondition").remove();
    }else{
        var Roperator =  '<select >' +           //关系运算符选项
            '<option>=</option>'+
            '<option>!=</option>'+
            '</select>';
        var conditionValue = "";
        /*发送请求获取键值*/
        var measurement = $(this).parent().parent().children().eq(4).find("option:selected").text();
        var selectKey = $(this).find("option:selected").text();
        $.ajax({
            url:"http://"+serverSource+":"+databasePort+"/query?q=SHOW+TAG+VALUES+FROM+%22"+measurement+"%22+WITH+KEY+%3D+%22"+selectKey+"%22&db="+databaseSelect,
            type:"GET",
            async:false,
            success:function (data) {
                for(var index=0;index<data.results[0].series[0].values.length;index++){
                    conditionValue = conditionValue + '<option>'+data.results[0].series[0].values[index][1]+'</option>';
                }
                conditionValue = "<select>"+ conditionValue +"</select>" ;
            },
            error:function () {
                console.log("数据获取失败！！！");
            }
        });
        /*添加值选项*/
        $(this).after(Roperator+conditionValue);
        /*更改key选项内容*/
        var cNodes = [];
        for(var index=0;index<$(this).children().length;index++) {
            cNodes.push($(this).children().eq(index));
        }
        for(var index in cNodes) {
            cNodes[index].remove();
        }
        $(this).append("<option>"+selectKey+"</opiton>"+"<option>删除条件</option>");
        $(this).parent().after('<span class="glyphicon glyphicon-plus sql-icon sql-add-condition" id="plusID"></span>');
    }
});
/*选择数据表事件方法*/
$("body").on("change",".selectMeasurement",function () {
    /*当重新选择数据表时删除所有的条件选择*/
    var removeAllCondition = [];
    for(var index=0;index<$(this).parent().children().length;index++){
        if($(this).parent().children().eq(index).attr("class") == "conditonFirst" || $(this).parent().children().eq(index).attr("class") == "conditonExistence") {
            removeAllCondition.push($(this).parent().children().eq(index));
        }
    }
    for(var cond in removeAllCondition) {
        removeAllCondition[cond].remove();
    }
    /*把删除的 + 号重新添加*/
    var elemIndex = $(this).parent().children().length - 2;
    if($(this).parent().children().eq(elemIndex).attr("id") != "plusID") {
        $(this).parent().children().eq(elemIndex).after('<span class="glyphicon glyphicon-plus sql-icon sql-add-condition" id="plusID"></span>');
    }
});
/*生成查询语句事件方法*/

/*获取仪表盘配置数据*/
var meterType;
var rule;
var title;
var dashboard;
var dashboardGroupIndex;
var dashboardIndex;
$("body").on('click','.btn-previewMeter',function () {

    //获取用户编辑后的样式数据
    meterStyle=fetchValue(window.localStorage.getItem("page"));
    console.log(meterStyle);
    var queryDom = $("#tab1").children();
    var querySeq;           //查询语句序号
    var result;             //value or function()
    var measurement;        //查询的表
    var tagName;            //查询信息tag名称
    var tagValue;           //查询信息tag值
    var database = $(".selectDatabase").find("option:selected").text();
    //var query;
    if(database == "") {
        layer.alert("请选择数据库！",{icon:7,title:"WARN"});
    }else {
        if (queryDom.length > 1) {
            for (var i = 1; i < queryDom.length; i++) {
                var qObject = {
                    legend: " "
                };
                var obj = {};
                var tagKeysValue = {};
                var singleQuery = queryDom.eq(i).children();
                var flagValue;
                var legendValue;
                querySeq = queryDom.eq(i).attr("id");              //查询语句序号
                for (var index = 0; index < singleQuery.length; index++) {     //处理一条查询语句
                    flagValue = singleQuery.eq(index).attr("class");
                    switch (flagValue) {
                        case "selectResult":
                            result = singleQuery.eq(index).find("option:selected").text();
                            break;
                        case "selectMeasurement":
                            measurement = singleQuery.eq(index).find("option:selected").text();
                            break;
                        case "conditonFirst":
                            tagName = singleQuery.eq(index).children().eq(0).find("option:selected").text();
                            tagValue = singleQuery.eq(index).children().eq(2).find("option:selected").text();
                            tagKeysValue[tagName] = tagValue;
                            break;
                        case "conditonExistence":
                            tagName = singleQuery.eq(index).children().eq(1).find("option:selected").text();
                            tagValue = singleQuery.eq(index).children().eq(3).find("option:selected").text();
                            tagKeysValue[tagName] = tagValue;
                            break;
                        default:
                            break;

                    }
                }
                /*获取legend*/
                if(meterType == "unitvalue"){
                    legendValue = measurement;
                }else {
                    for (var p in tagKeysValue) {
                        if (p == "type_instance" || p == "instance") {
                            legendValue = tagKeysValue[p];
                        }
                    }
                }


                obj.queryInfoSeq = querySeq;
                obj.database = database;
                obj.measurements = measurement;
                obj.serverSource = serverSource;
                obj.port = databasePort;
                obj.tagKeysValue = tagKeysValue;
                qObject.legend = legendValue;
                qObject.queryInfo = obj;
                queryInfoArray.push(qObject);
                //query = "http://"+serverSource+":"+databasePort+"/query?q=select+value+from+"+measurement+"&db=collectd";
            }

            $.ajax({
                url: url,
                type: "GET",
                async: false,
                success: function (data) {
                    dashboard = data.dashboardArray;
                    dashboardGroupIndex = window.localStorage.getItem("dashboardGroupIndex");
                    dashboardIndex = window.localStorage.getItem("dashboardIndex");
                    meterType = dashboard[dashboardGroupIndex].meters[dashboardIndex].meterType;
                    rule = dashboard[dashboardGroupIndex].meters[dashboardIndex].rule;
                    title = dashboard[dashboardGroupIndex].meters[dashboardIndex].title;
                },
                error: function () {
                    console.log("获取数据失败！！！");
                }
            });



            makeMeter("showArea", meterType, queryToData(queryInfoArray, meterType, getConstantData()), title, rule, meterStyle);


        }
    }
});


$("body").on('click','.btn-save',function () {
    queryInfoArray = [] ;
    var queryDom = $("#tab1").children();
    var querySeq;           //查询语句序号
    var result;             //value or function()
    var measurement;        //查询的表
    var tagName;            //查询信息tag名称
    var tagValue;           //查询信息tag值
    var database = $(".selectDatabase").find("option:selected").text();
    //var query;
    if(database == "") {
        layer.alert("请选择数据库！",{icon:7,title:"WARN"});
    }else {
        if (queryDom.length > 1) {
            for (var i = 1; i < queryDom.length; i++) {
                var qObject = {
                    legend: " "
                };


                var obj = {};
                var tagKeysValue = {};
                var singleQuery = queryDom.eq(i).children();
                var flagValue;
                var legendValue;
                querySeq = queryDom.eq(i).attr("id");              //查询语句序号
                for (var index = 0; index < singleQuery.length; index++) {     //处理一条查询语句
                    flagValue = singleQuery.eq(index).attr("class");
                    switch (flagValue) {
                        case "selectResult":
                            result = singleQuery.eq(index).find("option:selected").text();
                            break;
                        case "selectMeasurement":
                            measurement = singleQuery.eq(index).find("option:selected").text();
                            break;
                        case "conditonFirst":
                            tagName = singleQuery.eq(index).children().eq(0).find("option:selected").text();
                            tagValue = singleQuery.eq(index).children().eq(2).find("option:selected").text();
                            tagKeysValue[tagName] = tagValue;
                            break;
                        case "conditonExistence":
                            tagName = singleQuery.eq(index).children().eq(1).find("option:selected").text();
                            tagValue = singleQuery.eq(index).children().eq(3).find("option:selected").text();
                            tagKeysValue[tagName] = tagValue;
                            break;
                        default:
                            break;

                    }
                }
                /*获取legend*/
                if(meterType == "unitvalue"){
                    legendValue = measurement;
                }else {
                    for (var p in tagKeysValue) {
                        if (p == "type_instance" || p == "instance") {
                            legendValue = tagKeysValue[p];
                        }
                    }
                }

                obj.queryInfoSeq = querySeq;
                obj.database = database;
                obj.measurements = measurement;
                obj.serverSource = serverSource;
                obj.port = databasePort;
                obj.tagKeysValue = tagKeysValue;
                qObject.legend = legendValue;
                qObject.queryInfo = obj;
                queryInfoArray.push(qObject);
                //query = "http://"+serverSource+":"+databasePort+"/query?q=select+value+from+"+measurement+"&db=collectd";
            }


        } else {
            layer.alert("请添加查询语句！", {icon: 7, title: "WARN"});
        }
    }



    //重新在主页面渲染样式更改后的仪表
    makeMeter(window.localStorage.getItem("dashboardID"), meterType, queryToData(queryInfoArray, meterType, getConstantData()), title, rule,meterStyle, 1);

    //保存仪表样式数据到数据库
    updateStyleData(window.localStorage.getItem("dashboardGroupID"),window.localStorage.getItem("dashboardID"),meterStyle);
    //保存仪表查询信息到数据库
    dashboard[dashboardGroupIndex].meters[dashboardIndex].data = queryInfoArray;
    $.ajax({
        url: "/dashboardFind",
        type: "GET",
        async: false,
        data: {
            meterObject: dashboard[dashboardGroupIndex].meters[dashboardIndex],
            dashboardArraySeq: dashboardGroupIndex,
            metersSeq: dashboardIndex
        },
        success: function (data) {
            console.log("发送成功！！！");
        },
        error: function () {
            console.log("发送失败！！！");
        }
    });


});

$("body").on('click','.btn-close',function(){
    var index = parent.layer.getFrameIndex(window.name); //得到当前弹出层的索引
    parent.layer.close(index); //执行关闭
});
console.log("haha");

