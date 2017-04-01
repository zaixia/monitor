/**
 * Created by wubin on 2016/12/15.
 */
import  {makeMeter} from './makeMeter';
import {queryToData, getConstantData} from './queryToData';
//获取全局变量g_url_data
import {g_url_data} from './global_value';
var url = g_url_data;

var styleData = null;
/**********************************/

// 获取当前时间
var now = new Date();
// 定义页面初始加载时间，起始时间为五分钟前
var startTimeTamp = dateFormat(new Date(now.getTime() - 5 * 60 * 1000));
// 定义页面初始加载时间，起始时间为当前时间
var endTimeTamp = dateFormat(new Date(now.getTime()));
var flag;
var quickAera;
/*定时器名称*/
var timeInterval;
//将字符串转化成时间格式
var startTimeMM = new Date(startTimeTamp);
var endTimeMM = new Date(endTimeTamp);
//算出起始时间和结束时间时间差的毫秒数
var dateRange = (endTimeMM).getTime() - (startTimeMM).getTime();
;
/*时间转换,将浏览器上时间转换为influxdb数据时间*/
function transTime(timeSring) {
    var start = Date.parse(new Date(timeSring));
    var date = new Date();
    /*    console.log(date);*/
    /*返回当前计算机上的时间和UTC时间之间相差的分钟数*/
    var num = date.getTimezoneOffset();
    var time = new Date(start + num * 60000);
    return dateFormat(time);
}
/*将时间转换为2017-02-17的格式*/
function dateFormat(time) {
    var yy, mon, dd;
    var hh, min, ss;
    yy = time.getFullYear();
    if ((time.getMonth() + 1) < 10) {
        mon = time.getMonth() + 1;
        mon = "0" + mon;
    } else mon = time.getMonth() + 1;
    if (time.getDate() < 10) {
        dd = "0" + time.getDate();
    } else dd = time.getDate();
    if (time.getHours() < 10) {
        hh = "0" + time.getHours();
    } else hh = time.getHours();
    if (time.getMinutes() < 10) {
        min = "0" + time.getMinutes();
    } else min = time.getMinutes();
    if (time.getSeconds() < 10) {
        ss = "0" + time.getSeconds();
    } else ss = time.getSeconds();
    return yy + "-" + mon + "-" + dd + " " + hh + ":" + min + ":" + ss;
};
var startTime = "'" + transTime(startTimeTamp) + "'";
var endTime = "'" + transTime(endTimeTamp) + "'";
/*时间转换,将influxdb数据时间转换为浏览器上时间*/
function transToLocalTime(timeSring) {
    var start = Date.parse(new Date(timeSring));
    //将数据库时间转换成本地对应时间
    var time = new Date(start);
    return dateFormat(time);
};

/*将定时刷新里面的时间转换为毫秒*/
function transRefreshTime(refreshTime) {
    var tamp;
    var number;
    /*将获得的时间间隔进行分割*/
    tamp = refreshTime.split("");
    /*获取数字*/
    number = parseInt(refreshTime);
    /*获取最后一位单位*/
    switch (tamp[tamp.length - 1]) {
        case 's':
            return number * 1000;
            break;
        case 'm':
            return number * 60000;
            break;
        case 'h':
            return number * 3600000;
            break;
        case 'd':
            return number * 1000 * 3600 * 24;
            break;
    }
}
/*时间范围*/
$(".range-startTime").text(startTimeTamp);
$(".range-endTime").text(endTimeTamp);
/*起始时间和结束时间*/
$("#startTime").val(startTimeTamp);
$("#endTime").val(endTimeTamp);
/*点击应用按钮*/
$(".saveBtn").bind("click", function () {
    //$(".cas-period-content").hide();
    if($("#endTime").val()=='now()'&&$("#startTime").val().indexOf('now()')!=-1){
        startTime=$("#startTime").val();
        endTime=$("#endTime").val();


        var end_time=new Date();
        var start_time=new Date(end_time.getTime()-transRefreshTime(quickAera));
        startTimeMM=new Date(start_time);
        endTimeMM=new Date(end_time);
        dateRange=(endTimeMM).getTime()-(startTimeMM).getTime();

    }else {

        startTime = "'" + transTime($("#startTime").val()) + "'";
        endTime = "'" + transTime($("#endTime").val()) + "'";

        startTimeMM = new Date($("#startTime").val());
        endTimeMM = new Date($("#endTime").val());
        dateRange = (endTimeMM).getTime() - (startTimeMM).getTime();
    }


    /*展示查询时间区域*/
    $(".range-startTime").text($("#startTime").val());
    $(".range-endTime").text($("#endTime").val());
    /*将快速区间和定时刷新删除*/
    if (flag == 2) {
        $(".Quick-diameter-select").val("0");
        if (timeInterval != null) {
            window.clearInterval(timeInterval);
            timeInterval = null;
        }
        $(".refresh-time-select").val("关闭");
    }

    /*请求仪表的样式数据*/
    req_styleData();

    /*将数据展示在仪表盘*/
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        async: false,
        success: function (dashData) {
            var dashboard = dashData.dashboardArray;
            for (let i = 0; i < dashboard.length; i++) {
                for (let j = 0; j < dashboard[i].meters.length; j++) {
                    var data = dashboard[i].meters[j].data;
                    var meterType = dashboard[i].meters[j].meterType;
                    var title = dashboard[i].meters[j].title;

                    /*遍历样式数据数组，根据仪表Id找到相对应的样式数据*/
                    var meterStyle={};
                    for(let k=0;k<styleData.length;k++) {
                        if (dashboard[i].rowList == styleData[k].rowList) {

                            for (let m = 0; m < styleData[k].meters.length; m++) {
                                if (dashboard[i].meters[j].id == styleData[k].meters[m].id) {
                                    meterStyle = styleData[k].meters[m].styleData;
                                }
                            }
                        }
                    }


                    makeMeter(dashboard[i].meters[j].id, dashboard[i].meters[j].meterType, queryToData(data, meterType, getConstantData()), title, dashboard[i].meters[j].rule,meterStyle);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus) {
        }
    });
});
$(".Quick-diameter-select").bind("change", function () {
    /*如果快速区域选择关闭*/
    if ($(this).val() == 0) {
        clearInterval(timeInterval);
        timeInterval = null;
        $(".refresh-time-select").val("关闭");
        /*将now() - 时间区间 的函数转换成标准时间格式并显示在时间文本框*/
        var timeString;
        var nowTime = new Date();
        var startTimeNow = new Date(nowTime.getTime() - transRefreshTime(quickAera));
        timeString = dateFormat(startTimeNow);
        $("#startTime").val(timeString);
        $(".range-startTime").text(timeString);
        timeString = dateFormat(nowTime);
        $("#endTime").val(timeString);
        $(".range-endTime").text(timeString);
        flag = 1;
        //console.log($(".Quick-diameter-select").find("option:selected").text());
    }
    /*如果快速区域选择时间*/
    else {
        flag = 2;
        quickAera = $(this).val();
        dateRange = transRefreshTime(quickAera);
        startTime = "now() - " + quickAera;
        endTime = "now()";
        /*时间范围*/
        $(".range-startTime").text(startTime);
        $(".range-endTime").text(endTime);
        /*起始时间和结束时间*/
        $("#startTime").val(startTime);
        $("#endTime").val(endTime);

        /*请求仪表的样式数据*/
        req_styleData();

        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            async: false,
            success: function (dashData) {
                var dashboard = dashData.dashboardArray;
                for (var i = 0; i < dashboard.length; i++) {
                    for (var j = 0; j < dashboard[i].meters.length; j++) {
                        var data = dashboard[i].meters[j].data;
                        var meterType = dashboard[i].meters[j].meterType;
                        var title = dashboard[i].meters[j].title;

                        /*遍历样式数据数组，根据仪表Id找到相对应的样式数据*/
                        var meterStyle={};
                        for(let k=0;k<styleData.length;k++) {
                            if (dashboard[i].rowList == styleData[k].rowList) {

                                for (let m = 0; m < styleData[k].meters.length; m++) {
                                    if (dashboard[i].meters[j].id == styleData[k].meters[m].id) {
                                        meterStyle = styleData[k].meters[m].styleData;
                                    }
                                }
                            }
                        }
                        makeMeter(dashboard[i].meters[j].id, dashboard[i].meters[j].meterType, queryToData(data, meterType, getConstantData()), title, dashboard[i].meters[j].rule,meterStyle);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus) {
                console.log("获取数据失败！！！");
            }
        });
    }
});
/*设置定时刷新*/
$(".refresh-time-select").bind("change", function () {
    if ($(this).val() == "关闭") {
        clearInterval(timeInterval);
        timeInterval = null;
    } else {
        if (flag == 2 && timeInterval == null) {
            /*定时器刷新*/
            startTime = "now() - " + quickAera + " %2B " + $(this).val();   // + 2B!!!!!!
            endTime = "now()" + " %2B " + $(this).val();
            timeInterval = window.setInterval(
                function () {

                    /*请求仪表的样式数据*/
                    req_styleData();

                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        async: false,
                        success: function (dashData) {
                            var dashboard = dashData.dashboardArray;
                            for (var i = 0; i < dashboard.length; i++) {
                                for (var j = 0; j < dashboard[i].meters.length; j++) {
                                    var data = dashboard[i].meters[j].data;
                                    var meterType = dashboard[i].meters[j].meterType;
                                    var title = dashboard[i].meters[j].title;


                                    /*遍历样式数据数组，根据仪表Id找到相对应的样式数据*/
                                    var meterStyle={};
                                    for(let k=0;k<styleData.length;k++) {
                                        if (dashboard[i].rowList == styleData[k].rowList) {

                                            for (let m = 0; m < styleData[k].meters.length; m++) {
                                                if (dashboard[i].meters[j].id == styleData[k].meters[m].id) {
                                                    meterStyle = styleData[k].meters[m].styleData;
                                                }
                                            }
                                        }
                                    }


                                    makeMeter(dashboard[i].meters[j].id, dashboard[i].meters[j].meterType, queryToData(data, meterType, getConstantData()), title, dashboard[i].meters[j].rule,meterStyle);
                                }
                            }
                        },
                        error: function (XMLHttpRequest, textStatus) {
                        }
                    });
                }
                , transRefreshTime($(this).val()));
        }
        else if (flag == 2 && timeInterval != null) {
            /*切换刷新时间间隔*/
            clearInterval(timeInterval);
            timeInterval = null;
            /*定时器刷新*/
            startTime = "now() - " + quickAera + " %2B " + $(this).val();   // + 2B!!!!!!
            endTime = "now()" + " %2B " + $(this).val();
            timeInterval = window.setInterval(
                function () {

                    /*请求仪表的样式数据*/
                    req_styleData();


                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        async: false,
                        success: function (dashData) {
                            var dashboard = dashData.dashboardArray;
                            for (var i = 0; i < dashboard.length; i++) {
                                for (var j = 0; j < dashboard[i].meters.length; j++) {
                                    var data = dashboard[i].meters[j].data;
                                    var meterType = dashboard[i].meters[j].meterType;
                                    var title = dashboard[i].meters[j].title;


                                    /*遍历样式数据数组，根据仪表Id找到相对应的样式数据*/
                                    var meterStyle={};
                                    for(let k=0;k<styleData.length;k++) {
                                        if (dashboard[i].rowList == styleData[k].rowList) {

                                            for (let m = 0; m < styleData[k].meters.length; m++) {
                                                if (dashboard[i].meters[j].id == styleData[k].meters[m].id) {
                                                    meterStyle = styleData[k].meters[m].styleData;
                                                }
                                            }
                                        }
                                    }

                                    makeMeter(dashboard[i].meters[j].id, dashboard[i].meters[j].meterType, queryToData(data, meterType, getConstantData()), title, dashboard[i].meters[j].rule,meterStyle);
                                }
                            }
                        },
                        error: function (XMLHttpRequest, textStatus) {
                        }
                    });
                }
                , transRefreshTime($(this).val()));
        }
    }
});

/*请求仪表的样式数据*/
function req_styleData() {
    $.ajax({
        url: "/getStyleDataTest",
        type: "GET",
        async: false,
        dataType: "json",
        success: function (dashboardStyle) {
            styleData = dashboardStyle.dashboardStyleArray;
        },
        error: function () {
            console.log("ERROR:Request Style Data Wrong");
        }
    });
}


export {startTime, endTime, dateRange, transToLocalTime};
