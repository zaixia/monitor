/**
 * Created by wubin on 2016/11/7.
 */
import { queryToData,getConstantData } from './queryToData';//可以引入函数和变量
import { makeMeter } from './makeMeter';
import { dataChange } from './dataChange';
import { dashboardEdit} from './dashboardEdit';
import { setUpMeter} from './setUpMeter';
import {fetchValue} from './editMeter'

fetchValue();


//获取全局变量g_url_data
import { g_url_data } from './global_value';
var url = g_url_data;

require('jquery');
require('bootstrap.css');
require('bootstrap.js');
require('../css/style.css');
require('../css/modal.css');
require('layui-layer');
require('laydate');

$(document).ready(function(){
  //  $(".cas-header").append(peroidContent);
    $(".cas-period-content").hide();
});

    //时间段-显示隐藏
    $(".cas-period").click( function () {
        $(".cas-period-content").slideToggle(500);
    });

    // var peroidContent ='<form class="cas-period-content">'+
    //     '<p>时间范围</p>'+
    //     '<div class="form-group">'+
    //     '<label>起始时间</label>'+
    //     '<input class="laydate-icon" id="startTime">'+
    //     '</div>'+
    //     '<div class="form-group">'+
    //     '<label>结束时间</label>'+
    //     '<input class="laydate-icon" id="endTime">'+
    //     '</div>'+
    //     '<button type="button" class="saveBtn">应用</button>'+
    //     '<div class="form-group line-top">'+
    //     '<label>快速区间</label>'+
    //     '<select class="Quick-diameter-select">'+
    //     '<option value="0" selected="selected">关闭</option>'+
    //     '<option value="5m">最近5分钟</option>'+
    //     '<option value="15m">最近15分钟</option>'+
    //     '<option value="30m">最近30分钟</option>'+
    //     '<option value="1h">最近1小时</option>'+
    //     '<option value="3h">最近3小时</option>'+
    //     '<option value="6h">最近6小时</option>'+
    //     '<option value="12h">最近12小时</option>'+
    //     '<option value="1d">最近24小时</option>'+
    //     '<option value="7d">最近7天</option>'+
    //     '<option value="15d">最近15天</option>'+
    //     '<option value="30d">最近30天</option>'+
    //     '<option value="60d">最近60天</option>'+
    //     '<option value="90d">最近90天</option>'+
    //     '<option value="365d">最近1年</option>'+
    //     '</select>'+
    //     '</div>'+
    //     '<div class="form-group line-top">'+
    //     '<label>定时刷新</label>'+
    //     '<select class="refresh-time-select">'+
    //     '<option  selected="selected">关闭</option>'+
    //     '<option >5s</option>'+
    //     '<option >10s</option>'+
    //     '<option >30s</option>'+
    //     '<option >1m</option>'+
    //     '<option >5m</option>'+
    //     '<option >15m</option>'+
    //     '<option >30m</option>'+
    //     '<option >1h</option>'+
    //     '<option >2h</option>'+
    //     '<option >1d</option>'+
    //     '</select>'+
    //     '</div>'+
    // '</form>'

    /*页面刷新*/
    $("body").on('click','.page-date-refresh',function(){
            window.location.reload();
    });
    //仪表组标题显示、隐藏
    $("body").on('click','.toggleTitle',function(){
        $(this).parent().parent().next(".row").toggle();
        $(this).parent().parent().children(".cas-title").toggleClass("titleSelected");
        $(this).children(".glyphicon").toggleClass("glyphicon-resize-full");
        $(this).children(".glyphicon").toggleClass("glyphicon-resize-small");
    });
    //仪表组设置按钮显示、隐藏
    $("body").on('click','.cas-toggle-list',function(){
        $(this).next(".dashboardGroupCog").toggle();
    });

    //添加仪表
    /*    DBG---dashboardGroup*/
    var selectDBG = "<ul class='selectDBG'>" +
        "<li class='DB1'>热力图</li>"+
        "<li class='DB2'>折线图</li>"+
        "<li class='DB3'>柱形图</li>"+
        "<li class='DB4'>饼状图</li>"+
        "<li class='DB5'>雷达图</li>"+
       // "<li class='DB6'>双轴图</li>"+
      //  "<li class='DB7'>仪表图</li>"+
      //  "<li class='DB8'>环形图</li>"+
      //  "<li class='DB9'>矩形树图</li>"+
      //  "<li class='DB10'>文本信息</li>"+
        "<li class='DB11'>报警信息</li>"+
     //   "<li class='DB12'>数据表格</li>"+
      //  "<li class='DB13'>进度条</li>"+
        "<li class='DB14'>单值图</li>"+
     //   "<li class='DB15'>单值图B</li>" +
        "<li class='DB16'>3D饼状图</li>"+
        "<li class='DB17'>3D柱形图</li>"+
        "<i class='removeDB pull-right'>移除</i>"+
        "</ul>"
    $("body").on('click','.addDB',function(){
        $(".selectDBG").remove();
        $(this).parent().parent().parent().children().eq(0).after(selectDBG);
    });
    /*点击保存按钮，保存仪表数据*/
    $("body").on('click','#dashboardSave',function () {
        var dashboardArrayObject = {
            groupName:"集群单值表",
            rowList:"rowList1",
            meters:
                [
                    {
                        title:"WubinKING",
                        id:"uptime_value",
                        span:3,
                        meterType:"unitvalue",
                        data:
                            [
                                {
                                    legend:"uptime_value",
                                    queryInfo:{
                                        database:"collectd",
                                        measurements:"uptime_value",
                                        serverSource:"192.168.1.79",
                                        port:"8086",
                                        tagKeysValue:{
                                            host:"192.168.1.79",
                                            type:"uptime",
                                        }
                                    }

                                }
                            ]
                    },{
                    title:"load_shortterm",
                    id:"load_shortterm",
                    span:3,
                    meterType:"unitvalue",
                    data:
                        [
                            {
                                legend:"load_shortterm",
                                queryInfo:{
                                    database:"collectd",
                                    measurements:"load_shortterm",
                                    serverSource:"192.168.1.79",
                                    port:"8086",
                                    tagKeysValue:{
                                        host:"192.168.1.79",
                                        type:"load",
                                        type_instance:"relative"
                                    }
                                }

                            }
                        ]
                },{
                    title:"load_ midterm",
                    id:"load_ midterm",
                    span:3,
                    meterType:"unitvalue",
                    data:
                        [
                            {
                                legend:"load_ midterm",
                                queryInfo:{
                                    database:"collectd",
                                    measurements:"load_midterm",
                                    serverSource:"192.168.1.79",
                                    port:"8086",
                                    tagKeysValue:{
                                        host:"192.168.1.79",
                                        type:"load",
                                        type_instance:"relative"
                                    }
                                }

                            }
                        ]
                },{
                    title:"load_ longterm",
                    id:"load_ longterm",
                    span:3,
                    meterType:"unitvalue",
                    data:
                        [
                            {
                                legend:"load_longterm",
                                queryInfo:{
                                    database:"collectd",
                                    measurements:"load_longterm",
                                    serverSource:"192.168.1.79",
                                    port:"8086",
                                    tagKeysValue:{
                                        host:"192.168.1.79",
                                        type:"load",
                                        type_instance:"relative"
                                    }
                                }

                            }
                        ]
                }
                ]
        }
        $.ajax({
            url:"/dashboardSave",
            type:"GET",
            success:function(data,textStatus){
                console.log("2222222");
                console.log(data);
                console.log(textStatus);
            }
        })
    });
    /*展示静态数据*/
    /*静态数据的key值*/
    var constantSeries = "";
    var constantValue = getConstantData();
    for (let idx in constantValue){
        var constantInfo = "";
        for(let i = 0 ; i < constantValue[idx].length; i ++){
            constantInfo += '<option>'+constantValue[idx][i]+'</option>'
        };
        constantSeries += '<label class="cas-header-label">'+idx+
            '<select class="'+idx+'">'+constantInfo+
            '</select>'+'</label>';
    }
    $(".constant").append(constantSeries);
    dataChange(constantValue);


//请求仪表盘的初始样式数据////////////////////////
var initialStyleData = [];
$.ajax({
        url: "/getStyleDataTest",
        type : "GET",
        async : false,
        dataType : "json",
        success : function (dashboardStyle) {
              initialStyleData=dashboardStyle.dashboardStyleArray;
        },
        error:function () {
              console.log("ERROR:Request Style Data Wrong");
        }
    });
console.log('INFO: InitialStyleData');
console.log(initialStyleData);



    $.ajax({
        url: url,
        type:"GET",
        success:function (dashData) {
            let dashboard = dashData.dashboardArray;
            /*形成仪表组，进行仪表组的循环*/
            for(var j = 0 ;j<dashboard.length;j ++){
                var rowDiv = '<div class="container-fluid"><div class="cas-toggle-title"><span class="cas-title">' +
                    ''+dashboard[j].groupName+'' +
                    '</span>' +
                    '<ul class="cas-title-toolbox"><li class="toggleTitle"><span class="glyphicon glyphicon-resize-small"></span><i>折叠</i></li><li class="addDB"><span class="glyphicon glyphicon-plus"></span><i>创建仪表</i></li><li><span class="glyphicon glyphicon-cog"></span><i>仪表组设置</i></li><li class="btn-open-deletemodal"><span class="glyphicon glyphicon-remove"></span><i>删除仪表组</i></li></ul>'+
                    '</div><div class="row '+dashboard[j].rowList+'"></div></div>';
                $(".dashboard").append(rowDiv);
                /*形成仪表，进行仪表的循环*/
                for (var i = 0;i<dashboard[j].meters.length;i++ ){
                    /*仪表盘数据*/
                    var data = dashboard[j].meters[i].data;
                    /*仪表盘函数类型*/
                    var meterType = dashboard[j].meters[i].meterType;
                    /*仪表的div中ID容器*/
                    var Id = dashboard[j].meters[i].id;
                    var title = dashboard[j].meters[i].title;
                    var series = '<div class="col-md-'+dashboard[j].meters[i].span+' col-sm-12">'+
                        '<div class="cas-panel-head">'+dashboard[j].meters[i].title+'<span class="glyphicon glyphicon-cog cas-title-cog">'+
                        '<input type="hidden" value="'+Id+'"/></span></div>'+
                        '<div class="cas-panel-body">'+
                        '<div class="cas-chart-container overflowY" id="'+Id+'"></div></div></div>';
                    /*所有的内容都被放置在<div class="cas-chart-container">里面，并对该div定义一个ID*/
                    $("."+dashboard[j].rowList).append(series);
                    /*根据data信息，返回仪表数据*/
                    var meterInfo = queryToData(data,meterType,constantValue);


                    /*遍历样式数据数组，根据仪表Id找到相对应的样式数据*/
                    var styleData={};
                    for(var k=0;k<initialStyleData.length;k++) {
                        if (dashboard[j].rowList == initialStyleData[k].rowList) {

                        for (var m = 0; m < initialStyleData[k].meters.length; m++) {
                            if (Id == initialStyleData[k].meters[m].id) {
                                styleData = initialStyleData[k].meters[m].styleData;
                            }
                        }
                     }
                    }

                    /*执行仪表函数*/
                    /*判断是否存在rule规则*/
                    makeMeter(Id,meterType,meterInfo,title,dashboard[j].meters[i].rule,styleData);
                }
            }
        },
        error:function (XMLHttpRequest,textStatus) {
        }
    });
/*对仪表组/仪表盘进行编辑，如添加、删除、编辑仪表盘样式等*/
dashboardEdit();





