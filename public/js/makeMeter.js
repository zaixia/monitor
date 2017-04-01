/**
 * Created by wubin on 2016/12/20.
 *
 * note:
 *    对目前页面展示的图表的生成函数：
 *    添加了styleData参数，保存图表的样式数据
 *    添加了isEdit参数，用于判断是否是从仪表样式编辑页面调用
 *                                                 --by Wong   2017-3-7
 */
var echarts = require("echarts");
var Highcharts = require("highcharts");
/*需要加载的highcharts-3d模块*/
require('highcharts/highcharts-3d')(Highcharts);
var castheme = require("./castheme");
import {dateRange} from './dateRange';

/*测试*/
function maketest(divId,legend_data,xAxis_data,series_data) {
    var myCharts = echarts.init(document.getElementById(divId));
    var option = {
        title: {
            text: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:legend_data
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis :{
            type : 'category',
            boundaryGap : false,
            data :xAxis_data
        },
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : function () {
            var serie = [];
            for (var i=0; i< series_data.length; i++){
                var item = {
                    data :series_data[i],
                    name : legend_data[i],
                    type : 'line'
                };
                serie.push(item);
            }
            return serie;
        }()
    };
    myCharts.setOption(option);
}
/*1、热力图*/
function makeHeatmap(divId,heatmapInfoArray,heatmapRule,styleData,isEdit){
    /*数组长度*/
    var arrayLength = heatmapInfoArray.length;
    /*热力图边长*/
    var heatMapLengt = Math.ceil(Math.sqrt(arrayLength));
    /*仪表热力图数组序号index*/
    var infoArrayIndex;
    /*X轴与Y轴的数据*/
    var heatmapData = [];
    var heatmapSeriesData = [];
    /*Y轴循环*/
    for(var j=0;j < heatMapLengt;j++){
        /*X轴与Y轴的数值*/
        heatmapData.push(j);
        /*X轴循环*/
        for(var k=0;k < heatMapLengt;k++){
            var heatmapSingleData = [];
            infoArrayIndex = (j)*heatMapLengt+k+1;
            if(infoArrayIndex <= arrayLength){
                heatmapSingleData.push(k);
                heatmapSingleData.push(j);
                heatmapSingleData.push(heatmapInfoArray[infoArrayIndex-1].value);
            }else{
                heatmapSingleData.push(k);
                heatmapSingleData.push(j);
                heatmapSingleData.push('-');
            }
            heatmapSeriesData.push(heatmapSingleData);
        }
    };

    var myCharts;
    if(isEdit === undefined) {
         myCharts = echarts.init(document.getElementById(divId),'castheme');
    }else{
        //获取父页面中仪表所在的dom节点
         myCharts = echarts.init(window.parent.document.getElementById(divId), 'castheme');
    }

    let option = {
        tooltip: {
            formatter:function (params) {
                /*params.value中，0对应的是X轴，1对应的是Y轴，其中X周与Y轴都是从0开始的*/
                var index = (params.value[1])*heatMapLengt + params.value[0];
                var toolTipInfo = "<p class='heartmap-hostip'><span>hostIP:</span>"+heatmapInfoArray[index].hostIP+"</p><p class='heartmap-hostname'><span>hostName:</span>"+
                    heatmapInfoArray[index].hostName+"</p><p class='heartmap-value'><span>value:</span>"+
                    heatmapInfoArray[index].value+"</p>";
                return toolTipInfo;
            }
        },
        animation: false,
        grid: {
            height: '70%',
            y: '15%'
        },
        legend : {
            textStyle : {
                color : '#eee',
                fontSize : 12
            }

        },
        backgroundColor : styleData.backgroundColor,
        xAxis: {
            type: 'category',
            axisLabel:{
                show:false
            },
            data: heatmapData,
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'category',
            data: heatmapData,
            axisLabel:{
                show:false
            },
            splitArea: {
                show: true
            }
        },
        visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            top: 'top',
            type:'piecewise',
            pieces: function () {
                var ruleArray = [];
                for(let i=0;i<heatmapRule.colorArray.length;i++){
                    let piecesObject = {};
                    piecesObject.gte = heatmapRule.levelArray[i];
                    piecesObject.lt = heatmapRule.levelArray[i+1];
                    piecesObject.color = heatmapRule.colorArray[i];
                    ruleArray.push(piecesObject);
                };
                return ruleArray;
            }(),
            textStyle:{
                color:'#fff'
            }
        },
        series: [{
            name: 'disk使用率',
            type: 'heatmap',
            data: heatmapSeriesData,
            label: {
                normal: {
                    show: styleData.otherParams.label_show
                }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    myCharts.setOption(option);
}
/*2、单值*/
function makeUnitvalue(divId,value_data,styleData,isEdit){
    var myCharts;
    if(isEdit === undefined) {
        myCharts = echarts.init(document.getElementById(divId), 'castheme');
    }else{
        myCharts = echarts.init(window.parent.document.getElementById(divId), 'castheme');
    }

    let option = {
        title: {
            text: value_data,
            x: 'center',
            y: 'center',
            textStyle: {
                color: styleData.textColor[0],
                fontWeight: styleData.textWeight[0],
                fontSize: styleData.textSize[0],
            }
        },
        series: [{
            hoverAnimation: false,
            legendHoverLink: false,
            type: 'pie',
            radius: [styleData.otherParams.pie_radius[0], styleData.otherParams.pie_radius[1]],
            label: {
                normal: {
                    show: false
                }
            },
            data: [
                {
                    value:100,
                    itemStyle: {
                        normal: {
                            color: styleData.areaStyle.color,
                        }
                    }
                }]
        }]

    };
    myCharts.setOption(option);
}

/*3、折线图*/
function makeLine(divId,legend_data,xAxis_data,series_data,styleData,isEdit){
    var myCharts;
    if(isEdit === undefined) {
        myCharts = echarts.init(document.getElementById(divId), 'castheme');
    }else{
        myCharts = echarts.init(window.parent.document.getElementById(divId), 'castheme');
    }

    var option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: legend_data,
            textStyle : {
                color : styleData.textColor[1],
                fontSize : styleData.textSize[1],
                fontWeight : styleData.textWeight[1]
            }
        },
        backgroundColor : styleData.backgroundColor,
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxis_data,
            axisLabel: {
                formatter: function (value, idx) {
                    var date = new Date(value);

                    if(dateRange <= 5*60*1000){
                        //小于五分钟
                        return [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
                    }else if(dateRange > 5*60*1000 && dateRange <= 24*60*60*1000){
                        //大于五分钟小于一天
                        return [date.getHours(), date.getMinutes()].join(':');
                    }else if(dateRange > 24*60*60*1000 && dateRange <= 30*24*60*60*1000){
                        //大于一天小于七天
                        return [date.getMonth()+1, date.getDate()].join('-')+" "+[date.getHours(), date.getMinutes()].join(':');
                    }else if(dateRange > 30*24*60*60*1000 && dateRange <= 365*24*60*60*1000){
                        //大于七天小于一年
                        return [date.getMonth()+1, date.getDate()].join('-');
                    }else {
                        //大于一年
                        return [date.getYear(), date.getMonth()+1].join('-');
                    }

                }
            }
        },
        yAxis: [
            {
                type: 'value'
            }
        ],
        series:function () {
            var serie = [];
            for (var i = 0; i < series_data.length; i++) {
                var item = {
                    data: series_data[i],
                    name: legend_data[i],
                    type: 'line',
                    animation: true,
                    lineStyle : {
                        normal : {
                            width : styleData.lineStyle.width,
                            type : styleData.lineStyle.type,
                            opacity: styleData.lineStyle.opacity
                        }
                    },
                    smooth : styleData.lineStyle.smooth,
                    areaStyle : {
                        normal : {
                            opacity: styleData.areaStyle.opacity
                        }
                    }

                };
                serie.push(item);
            }
            return serie;
        }()
    };
    myCharts.setOption(option);
}

/*4、柱形图*/
function makeBar(divId,legend_data,xAxis_date,series_data,styleData,isEdit){
    var myCharts;
    if(isEdit === undefined) {
        myCharts = echarts.init(document.getElementById(divId), 'castheme');
    }else{
        myCharts = echarts.init(window.parent.document.getElementById(divId), 'castheme');
    }

    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        legend: {
            show:true,
            data:legend_data,
            textStyle : {
                color : styleData.textColor[1],
                fontSize : styleData.textSize[1],
                fontWeight : styleData.textWeight[1]
            }
        },
        backgroundColor : styleData.backgroundColor,
        grid: {
            /*show:true,*/
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {},
                dataView:{},
                dataZoom:{},
                brush:{},
                restore:{},
                magicType:{}
            }
        },
        xAxis: {
            type: 'category',
            data: xAxis_date,
            axisLabel: {
                formatter: function (value, idx) {
                    var date = new Date(value);
                    if(dateRange <= 60*60*1000){
                        //小于一小时
                        return [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
                    }else if(dateRange > 60*60*1000 && dateRange <= 24*60*60*1000){
                        //大于一小时小于一天
                        return [date.getHours(), date.getMinutes()].join(':');
                    }else if(dateRange > 24*60*60*1000 && dateRange <= 7*24*60*60*1000){
                        //大于一天小于七天
                        return [date.getMonth()+1, date.getDate()].join('-')+" "+[date.getHours(), date.getMinutes()].join(':');
                    }else if(dateRange > 7*24*60*60*1000 && dateRange <= 365*24*60*60*1000){
                        //大于七天小于一年
                        return [date.getMonth()+1, date.getDate()].join('-');
                    }else {
                        //大于一年
                        return [date.getYear(), date.getMonth()+1].join('-');
                    }

                }
            }
        },
        yAxis: {
            type: 'value'
        },
        animationEasing: 'elasticOut', //抖动特效
        series: function () {
            var serie = [];
            for (var i=0; i< series_data.length; i++){
                let seriesData = series_data[i];
                let xAxisDate = xAxis_date;
                let legendData = legend_data[i]
                var item = {
                    name : legend_data[i],
                    type : "bar",
                    data : series_data[i],
                    markLine: {
                        data: [
                            {
                                name:'你太大了，超出50000了都',
                                yAxis:50000
                            }
                        ]
                    },
                    itemStyle : {
                        normal : {
                            opacity : styleData.areaStyle.opacity
                        }
                    }

                };
                serie.push(item);
            }
            return serie;
        }()
    };
    myCharts.setOption(option);
}

/*5、饼状图*/
function makePie(divId,legend_data,series_data,styleData,isEdit){
    let seriesData = [];
    seriesData.splice(0,seriesData.length);
    for(let i=0;i<series_data.length;i++){
        seriesData.push(series_data[i][0])
    }

    var myCharts;
    if(isEdit === undefined) {
        myCharts = echarts.init(document.getElementById(divId), 'castheme');
    }else{
        myCharts = echarts.init(window.parent.document.getElementById(divId), 'castheme');
    }

    var option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x : 'center',
            data:legend_data,
            textStyle : {
                color : styleData.textColor[1],
                fontSize : styleData.textSize[1],
                fontWeight : styleData.textWeight[1]
            }
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'半径模式',
                type:'pie',
                radius : ['10%','80%'],
                center : ['50%', '50%'],
                roseType : 'radius',
                label: {
                    normal: {
                        show: false,
                        textStyle : {
                            color : styleData.textColor[2],
                            fontWeight : styleData.textWeight[2],
                            fontSize : styleData.textSize[2]
                        }
                    },
                    emphasis: {
                        show: true
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:function () {
                    var serie = [];
                    for (var i=0; i< seriesData.length; i++){
                        var item = {
                            value : seriesData[i],
                            name : legend_data[i]
                        };
                        serie.push(item);
                    }
                    return serie;
                }()
            }
        ]
    };
    myCharts.setOption(option);
}

/*6、雷达图*/
function makeRadar(divId,legend_data,series_data,indicator_data,title,styleData,isEdit) {
    let seriesData = [];
    seriesData.splice(0,seriesData.length);
    for(let i=0;i<series_data.length;i++){
        seriesData.push(series_data[i][0])
    }

    var myCharts;
    if(isEdit === undefined) {
        myCharts = echarts.init(document.getElementById(divId),'castheme');
    }else{
        myCharts = echarts.init(window.parent.document.getElementById(divId),'castheme');
    }

    var option = {
        tooltip: {
        },
        legend: {
            show:true,
            data:[title],
            x:"center",
            textStyle : {
                color : styleData.textColor[1],
                fontSize : styleData.textSize[1]
            }
        },
        backgroundColor : styleData.backgroundColor,
        radar: {
            indicator: function () {
                var indicator = [];
                for (var i=0; i< legend_data.length; i++){
                    var item = {
                        name : legend_data[i],
                        max : indicator_data
                    };
                    indicator.push(item);
                }
                return indicator;
            }(),
            radius:"90",
            name : {
                textStyle : {
                    fontSize : styleData.textSize[2],
                    fontWeight : styleData.textWeight[2],
                    color :styleData.textColor[2]
                }
            }

        },
        series: [{
            name:title,
            type: 'radar',
            data:[{
                value:seriesData,
                name:title
            }],
            lineStyle : {
                normal : {
                    color : styleData.lineStyle.color,
                    width : styleData.lineStyle.width,
                    type : styleData.lineStyle.type
                }

            },
            areaStyle : {
                normal : {
                    color : styleData.areaStyle.color,
                    opacity : styleData.areaStyle.opacity
                }
            }
        }]
    };
    myCharts.setOption(option);
}

/*7、双轴图*/
function makeDoubleShaft(divId,data_xAxis,data_yAxis,data_legend,data_series,data_title,isEdit) {
    var myCharts;
    if(isEdit === undefined) {
        myCharts = echarts.init(document.getElementById(divId), 'castheme');
    }else{
        myCharts = echarts.init(window.parent.document.getElementById(divId), 'castheme');
    }

    var option = {
        /*        title: {
         text: data_title
         },*/
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            feature: {
                dataView: {
                    show: true,
                    readOnly: false,
                    optionToContent: function() {
                        var table = '<table style="width:100%;text-align:center"><tbody>';
                        for (var i = 0, l = axisData.length; i < l; i++) {
                            if(i=0){
                                table += '<tr>'
                                    + '<td></td>'
                                    + '<td>' + data_xAxis[0] + '</td>'
                                    + '<td>' + series[1].data[i] + '</td>'
                                    + '</tr>'
                            }else{
                                table += '<tr>'
                                    + '<td>' + data_legend[i] + '</td>'
                                    + '<td>' + data_xAxis[i] + '</td>'
                                    + '<td>' + series[1].data[i] + '</td>'
                                    + '</tr>';
                            }
                        }
                        table += '</tbody></table>';
                        return table;
                    }
                },
                magicType: {show: true, type: ['line', 'bar']},
                dataZoom:{
                    show:true,
                },
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data:data_legend
        },
        xAxis: [
            {
                type: 'category',
                data: data_xAxis
            }
        ],
        yAxis: function () {
            var serie = [];
            for (var i=0; i< data_yAxis.length; i++){
                var item = {
                    type : data_yAxis[i].type,
                    name : data_yAxis[i].name,
                    min : data_yAxis[i].min,
                    max : data_yAxis[i].max,
                    interval : data_yAxis[i].interval,
                    axisLabel: {
                        formatter: data_yAxis[i].formatter
                    }
                };
                serie.push(item);
            }
            return serie;
        }(),
        series: function () {
            var serie = [];
            for (var i=0; i< data_series.length; i++){
                var item = {
                    data : data_series[i].data,
                    name : data_series[i].name,
                    type : data_series[i].type,
                    yAxisIndex : data_series[i].yAxisIndex
                };
                serie.push(item);
            }
            return serie;
        }()
    };

    myCharts.setOption(option);
}

/*8、仪表盘*/
function makeGuage(divId,data_value,data_unit,title_text,isEdit) {
    var myCharts;
    if(isEdit === undefined) {
        myCharts = echarts.init(document.getElementById(divId), 'castheme');
    }else{
        myCharts = echarts.init(window.parent.document.getElementById(divId), 'castheme');
    }

    var option = {
        /*        title: {
         text: title_text,
         top:10
         },*/
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
        /*        tooltip : {
         formatter: "{a} <br/>{c} {b}"
         },*/
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },

        series : [

            {
                name:title_text,
                type:'gauge',
                min:0,
                max:100,
                splitNumber:10,
                radius: '90%',
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                        width: 3,
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisLabel: {            // 坐标轴小标记
                    textStyle: {       // 属性lineStyle控制线条样式
                        fontWeight: 'bolder',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length :15,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                splitLine: {           // 分隔线
                    length :25,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width:3,
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {           // 分隔线
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5
                },
                title : {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 20,
                        fontStyle: 'italic',
                        color: '#fff',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                detail : {
                    offsetCenter: [0, '50%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        color: '#fff',

                    }
                },
                data:[{value: data_value, name: data_unit}]
            }
        ]
    };
    myCharts.setOption(option);
}
/*9、环形图*/
function makeCircular(divId,legend_data,series_data,isEdit){
    var myCharts;
    if(isEdit === undefined) {
        myCharts = echarts.init(document.getElementById(divId), 'castheme');
    }else{
        myCharts = echarts.init(window.parent.document.getElementById(divId), 'castheme');
    }

    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            x: 'center',
            data:legend_data
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '30%'],

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:series_data[0].data
            },
            {
                name:'执行次数',
                type:'pie',
                radius: ['40%', '55%'],

                data:series_data[1].data
            }
        ]
    };

    myCharts.setOption(option);
}

/*10、矩形树图*/
function makeTreeMap(divId,series_data,name,isEdit) {
    var myCharts;
    if(isEdit === undefined) {
        myCharts = echarts.init(document.getElementById(divId), 'castheme');
    }else{
        myCharts = echarts.init(window.parent.document.getElementById(divId), 'castheme');
    }

    var option = {
        tooltip: {},
        series: [{
            name: name,
            type: 'treemap',
            visibleMin: 300,
            data: series_data,
            leafDepth: 2,
            roam: 'move',
            legend:{
              top:'top'
            },
            levels: [
                {
                    itemStyle: {
                        normal: {
                            borderColor: '#555',
                            borderWidth: 4,
                            gapWidth: 4
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.6],
                    itemStyle: {
                        normal: {
                            borderColorSaturation: 0.7,
                            gapWidth: 2,
                            borderWidth: 2
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.5],
                    itemStyle: {
                        normal: {
                            borderColorSaturation: 0.6,
                            gapWidth: 1
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.5]
                }
            ]
        }]
    };

    myCharts.setOption(option);
}

/*11、文本信息*/
function makeText(divID,text_data,isEdit){
    var textData = "<textarea class='cas-textarea overflowY'>"+text_data+"</textarea>";
    $("#"+divID).append(textData);
}

/*12、报警信息*/
function makeAlert(divID,series_data,rule,isEdit){
    if(series_data > rule.threshold){
        var alertContent = "<span class='glyphicon glyphicon-warning-sign issure position-top-right'></span>"+
            "<div class='cas-chart-container textLargeSize stateIssue'>"+series_data+"</div>"+
            "<div class='preloader'>"+
            "<div class='preloader-inner'></div>"+
            "</div>";
    }else{
        var alertContent = "<span class='glyphicon glyphicon-info-sign safe position-top-right'></span>"+
            "<div class='cas-chart-container textLargeSize stateOK'>"+series_data+"</div>"+
            "<div class='preloader'>"+
            "<div class='preloader-inner'></div>"+
            "</div>";
    }
    if(isEdit) {
        $("#"+divID,window.parent.document).append(alertContent);
    }else{
        $("#"+divID).append(alertContent);
    }
}

/*13、表格信息*/
function makeTable(divID,thead_data,tbody_data,isEdit){

    /*每个函数都会有一个参数，传递div的ID，函数中的内容，不管
     * 是图表，表格等，都被加载到这个div中*/
    var tableContainer = '<table class="'+divID+' cas-table"><table>';


    /*实现表格thead*/
    var tableTh ="";
    for(var i = 0 ;i<thead_data.length;i ++){
        tableTh += '<th><span class="glyphicon"></span>'+thead_data[i]+'</th>';
    };
    var tableThead = '<thead><tr>'+tableTh+'</tr></thead>';

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
    if(isEdit){
        /*在initApp中的<div class="cas-chart-container">块内加入表格*/
        $("#"+divID,window.parent.document).append(tableContainer);
        $("#"+divID,window.parent.document).append(tableThead);
        $("#"+divID,window.parent.document).append(tableTB);
    }else {
        /*在initApp中的<div class="cas-chart-container">块内加入表格*/
        $("#"+divID).append(tableContainer);
        $("."+divID).append(tableThead);
        $("."+divID).append(tableTB);
    }
}

/*14、进度条*/
function makeProgressBar(divID,series_data,isEdit) {
    /*初始化HTML元素*/
    var progressBar = "";
    for(var i = 0; i<series_data.length; i++){
        progressBar += '<div class="progress">'+
            '<div class="progress-bar progress-bar-info progress-bar-striped active" style="width: '+series_data[i].percent+'%;">'+
            '<i>'+series_data[i].name+'</i>'+
            '<div class="progress-value">'+series_data[i].percent+'%</div>'+
            '</div>'+
            '</div>';
    }
    if(isEdit) {
        $("#"+divID,window.parent.document).append(progressBar);
    } else {
        $("#"+divID).append(progressBar);
    }
}

/*15、单值*/
function makeSingle(divID,single_data,isEdit){
    var singlevalue = '<div class="cas-chart-container unitvalue-round">'+
        '<div class="unitvalue-rondLine">'+
        '<div class="unitvalue-ball"></div>'+
        '</div>'+
        '<div class="unitvalue-bg">'+
        '<p>'+single_data+'</p>'+
        '</div>'+
        '</div>';
    if(isEdit){
        $("#"+divID,window.parent.document).append(singlevalue);
    } else{
        $("#"+divID).append(singlevalue);
    }
};

/*3D饼状图*/
function make3DPie(divId,legend_data,series_data,styleData,isEdit){
    let seriesData = [];
    seriesData.splice(0,seriesData.length);
    for(let i=0;i<series_data.length;i++){
        seriesData.push(series_data[i][0])
    };

    var div;
    if(isEdit === undefined) {
        div= divId;
    }
    else {
        div=window.parent.document.getElementById(divId);
    }
    Highcharts.chart(div, {
        chart: {
            type: 'pie',
            backgroundColor: 'rgba(255,127,0,0)',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            style:{fontSize:'0px'}//隐藏标题
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        credits: {
            enabled: false
        },
        colors: ['#7eb26d', '#eab839', '#6ed0e0', '#ef843c', '#1f78c1', '#ba43a9', '#705da0'],
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: styleData.otherParams.pie_depth,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                },
                showInLegend:true
            }
        },
        legend: {
            align: 'center',
            verticalAlign: 'top',
            y: 0,
            itemStyle : {
                color : styleData.textColor[1],
                fontSize : styleData.textSize[1],
                fontWeight : styleData.textWeight[1]
            }
        },
        series: [{
            type: 'pie',
            name: 'Memory share',
            data: function () {
                var serie = [];
                for (var i=0; i< seriesData.length; i++){
                    var item = {
                        y : seriesData[i],
                        name : legend_data[i]
                    };
                    serie.push(item);
                }
                return serie;
            }(),
            dataLabels: {
                style: {
                    color:styleData.textColor[2],
                    shadow:false,
                    fontSize: styleData.textSize[2],
                    fontWeight: styleData.textWeight[2]
                }
            }
        }]
    });
};

/*3d柱状图*/
function make3DBar(divId,series_data,styleData,isEdit){
    var div;
    if(isEdit === undefined) {
        div= divId;
    }
    else {
        div=window.parent.document.getElementById(divId);
    }
    Highcharts.chart(div,{
        chart: {
            type: 'column',
            backgroundColor: 'rgba(0,0,0,0)',
            margin: 75,
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                depth: 110
            }
        },
        xAxis:{
            lineColor:'#eee',
            color:'#fff',
            lineColor: "#fff"
        },
        yAxis:{
            title:{
                text:''
            },
            lineColor:'#eee',
            color:'#fff',
            lineColor: "#fff"
        },
        zAxis:{
            lineColor:'#eee',
            color:'#fff',
            lineColor: "#fff"
        },
        colors: ['#7eb26d', '#eab839', '#6ed0e0', '#ef843c', '#1f78c1', '#ba43a9', '#705da0'],
        credits: {
            enabled: false
        },
        legend: {
            align: 'center',
            verticalAlign: 'top',
            y: 0,
            itemStyle : {
                color : styleData.textColor[1],
                fontSize : styleData.textSize[1]
            }
        },
        title: {
            text:'',
            style:{fontSize:'0px',}//隐藏标题
        },
        plotOptions: {
            column: {
                depth: 40,  //系列z轴宽度
                stacking: true,
                grouping: false,
                groupZPadding: 10 //系列间距
            }
        },
        series: function () {
            var serie = [];
            for (var i=0; i< series_data.length; i++){
                var item = {
                    data : series_data[i],
                    stack : i
                };
                serie.push(item);
            }
            return serie;
        }(),
    });
};
export function makeMeter(Id,meterType,meterOption,title,rule,styleData,isEdit) {
    switch (meterType) {
        case "heatmap":
            makeHeatmap(Id,meterOption.heatmap,rule,styleData,isEdit);
            break;
        case "unitvalue":
            makeUnitvalue(Id, meterOption.series,styleData,isEdit);
            break;
        case "line":
            makeLine(Id,meterOption.legend,meterOption.xAxis,meterOption.series,styleData,isEdit);
            break;
        case "bar":
            makeBar(Id,meterOption.legend,meterOption.xAxis, meterOption.series,styleData,isEdit);
            break;
        case "3Dbar":
            make3DBar(Id, meterOption.series,styleData,isEdit);
            break;
        case "pie":
            makePie(Id,meterOption.legend,meterOption.series,styleData,isEdit);
            break;
        case "3Dpie":
            make3DPie(Id,meterOption.legend,meterOption.series,styleData,isEdit);
            break;
        case "radar":
            makeRadar(Id,meterOption.legend, meterOption.series,meterOption.sum,title,styleData,isEdit);
            break;
        case "double_shaft":
            makeDoubleShaft(Id,Data.xAxis,Data.yAxis,Data.legend,Data.series,Data.title,isEdit);
            break;
        case "gauge":
            makeGuage(Id, Data.value, Data.unit, Data.title,isEdit);
            break;
        case "circular":
            makeCircular(Id, Data.legend, Data.series,Data.title,isEdit);
            break;
        case "treemap":
            makeTreeMap(Id, Data.series,Data.name,isEdit);
            break;
        case "text":
            makeText(Id, Data.data,isEdit);
            break;
        case "alert":
            makeAlert(Id, meterOption.series,rule,isEdit);
            break;
        case "table":
            makeTable(Id, Data.thead,Data.tbody,isEdit);
            break;
        case "progressbar":
            makeProgressBar(Id, Data.series,isEdit);
            break;
        case "single":
            makeSingle(Id, Data.value,isEdit);
            break;
        default:
    }
}
