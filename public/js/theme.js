/**
 * Created by Wubin on 2016/11/25.
 */
/*测试*/
function maketest(divId,legend_data,xAxis_data,series_data) {
    var myCharts = echarts.init(document.getElementById(divId));
    option = {
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
function makeHeatmap(divId,xAxis_data,yAxis_data,series_data) {
    var myCharts = echarts.init(document.getElementById(divId),'castheme');
    var data = series_data.map(function (item) {
        return [item[1], item[0], item[2] || '-'];
    });
    option = {
        tooltip: {
            position: 'top'
        },
        animation: false,
        grid: {
            height: '50%',
            y: '10%'
        },
        xAxis: {
            name:'IP',
            type: 'category',
            data: xAxis_data,
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'category',
            data: yAxis_data,
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
            bottom: '15%',
            type:'piecewise',
            pieces: [
                {min: 80},
                {min: 60, max: 80},
                {max: 60}
            ],
            color: ['#DA251C','#FEC303','#009241'],
            textStyle:{
                color:'#fff'
            }

        },
        series: [{
            name: 'disk使用率',
            type: 'heatmap',
            data: data,
            label: {
                normal: {
                    show: true
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
    myCharts.on('click', function (params) {
        console.log(params);
        $('#myModal').modal({
            keyboard: false,
            show:true
        })
    });
}

/*2、单值*/
function makeUnitvalue(divId,value_data){
    var myCharts = echarts.init(document.getElementById(divId),'castheme');
    option = {
        title: {
            text: value_data,
            x: 'center',
            y: 'center',
            textStyle: {
                color: '#fff',
                fontWeight: 'bolder',
                fontSize: 30,
            }
        },
        series: [{
            hoverAnimation: false,
            legendHoverLink: false,
            type: 'pie',
            radius: ['80%', '75%'],
            label: {
                normal: {
                    show: false,
                }
            },
            data: [{
                itemStyle: {
                    normal: {
                        color: '#1E90FF',
                    }
                }
            }]
        }, {
            type: 'pie',
            radius: ['70%', '70%']
        }]
    };

    myCharts.setOption(option);
}

/*3、折线图*/
var lineOption ;
function makeLine(divId,tooltipAttr,legendAttr,backgroundColorAttr,textStyleAttr,gridAttr,toolboxAttr,xAxisAttr,yAxisAttr,dataZoomAttr,seriesUsualAttr,seriesAttr){
    var myCharts = echarts.init(document.getElementById(divId),'castheme');
    lineOption  = {
        tooltip: {
            trigger: 'axis',
            show:tooltipAttr.show,                //（组件3.4）设置提示框的显示与隐藏
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            show:true,
            data:legendAttr.data,
            /*（组件3.1）图例组件下的位置，只能实现左中右调整*/
            left:legendAttr.left,
            orient:legendAttr.orient
        },
        backgroundColor:backgroundColorAttr, //（样式2.7）设置图表背景颜色
        /*（布局4）设置仪表盘位置*/
        /*字体颜色样式*/
        textStyle:{
            color:textStyleAttr.color,
            fontWeight:textStyleAttr.fontWeight,
            fontSize:textStyleAttr.fontSize
        },
        grid: {
            left: gridAttr.left,
            right: gridAttr.right,
            top:gridAttr.top,
            bottom: gridAttr.bottom,
        },
        /*(组件3.5)自定义工具栏*/
        toolbox: {
            feature: {
                /*(组件3.5.2)保存图片*/
                saveAsImage: {
                    show:toolboxAttr.feature.saveAsImage.show
                },
                /*(组件3.5.3)配置项还原*/
                restore:{
                    show:toolboxAttr.feature.restore.show
                },
                /*(组件3.5.4)数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新*/
                dataView:{
                    show:toolboxAttr.feature.dataView.show
                },
                /*(组件3.5.5)数据区域缩放。目前只支持直角坐标系的缩放*/
                dataZoom:{
                    show:toolboxAttr.feature.dataZoom.show
                },
                /*(组件3.5.6)动态类型切换*/
                magicType:{
                    show:true,
                    type: toolboxAttr.feature.magicType.type
                }
            }
        },
        xAxis: {
            type: xAxisAttr.type, //（坐标轴1.2）坐标轴数据类型
            data: xAxisAttr.data,
            position:xAxisAttr.position, //（坐标轴1.1）坐标轴位置
            name:xAxisAttr.name,  //（坐标轴1.3）坐标轴名称
            axisTick:{
                alignWithLabel:xAxisAttr.axisTick.alignWithLabel //(坐标轴1.7)横轴数据是否与刻度对齐（true是刻度对其，false在两刻度之间）
            }
        },
        yAxis: function () {
            var serie = [];
            for (var i=0; i< yAxisAttr.length; i++){
                var item = {
                    type : yAxisAttr[i].type,        //（坐标轴1.2）坐标轴数据类型
                    position:yAxisAttr[i].position, //（坐标轴1.1）坐标轴位置
                    name : yAxisAttr[i].name,       //（坐标轴1.3）坐标轴名称
                    /*（坐标轴1.6）设置坐标轴单位*/
                    axisLabel: {
                        formatter: yAxisAttr[i].axisLabel.formatter
                    },
                    interval : yAxisAttr[i].interval,   //（坐标轴1.4）设置坐标轴的分隔大小
                    min : yAxisAttr[i].min,      //（坐标轴1.5）设置坐标轴的最小值
                    max : yAxisAttr[i].max       //（坐标轴1.5）设置坐标轴的最大值
                };
                serie.push(item);
            }
            return serie;
        }(),
        /*（组件3.6）区域进行缩放*/
        dataZoom: {
            show:dataZoomAttr.show, //(组件3.6.1)是否显示区域缩放
            type: 'slider',
            start: 0,
            end: 100,
            startValue:null,
            endValue:null,
            textStyle:{
                color:dataZoomAttr.textStyle.color //（组件3.6.2）区域缩放字体的颜色
            }
        },
        series: function () {
            var serie = [];
            for (var i=0; i< seriesAttr.length; i++){
                var item = {
                    name : seriesAttr[i].name, //（样式）设置线的名字
                    type : seriesAttr[i].type,  //（样式）设置线的类型（bar、line）
                    data : seriesAttr[i].data,  //线的数据
                    yAxisIndex:seriesAttr[i].yAxisIndex,
                    lineStyle:{
                        normal:{
                            color: seriesAttr[i].lineStyle.color,  //（样式2.1）设置线条的颜色
                            width:seriesUsualAttr.lineStyle.width,   //(样式2.2)设置线条的粗细
                            type:seriesUsualAttr.lineStyle.type,     //(样式2.4)设置线的类型 'solid'、'dashed'、'dotted'
                            opacity:seriesUsualAttr.lineStyle.opacity //（样式2.5）设置线的透明度
                        }
                    },
                    /*（样式2.6）设置填充样式的透明度*/
                    areaStyle: {normal: {
                        color: seriesAttr[i].lineStyle.color,  //(样式2.6.1)填充颜色[与线lineStyle的颜色一样，不需要用户进行设置]
                        opacity:seriesUsualAttr.areaStyle.opacity  //（样式2.6.2）填充透明度[所有的线统一设置]
                    }},
                    /*(组件3.2)设置图表标记-点标记*/
                    markPoint:{
                        symbol:seriesUsualAttr.markPoint.symbol,          //(组件3.2.1)标记图标的样式[所有的线统一设置]
                        symbolSize:seriesUsualAttr.markPoint.symbolSize,    //(组件3.2.2)标记图表的大小[所有的线统一设置]
                        data:seriesAttr[i].markPoint.data                /*(组件3.2.3)设置需要标记的数值，标记的名称*/
                    },
                    /*(组件3.3)设置图表标记-线标记*/
                    markLine:{
                        data: seriesAttr[i].markLine.data  //(组件3.3)图表标记--线标记
                    },
                    /*（样式2.3）是否平滑曲线显示,默认为false*/
                    smooth:seriesUsualAttr.smooth
                };
                serie.push(item);
            }
            return serie;
        }()
    };
    myCharts.setOption(lineOption);
}

/*4、柱形图*/
function makeBar(divId,xAxis_date,legend_data,series_data){
    var myCharts = echarts.init(document.getElementById(divId),'castheme');
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            show:true,
            data:legend_data
        },
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
            data: xAxis_date
        },
        yAxis: {
            type: 'value'
        },
        series: function () {
            var serie = [];
            for (var i=0; i< series_data.length; i++){
                var item = {
                    name : series_data[i].name,
                    type : "bar",
                    data : series_data[i].data,
                };
                serie.push(item);
            }
            return serie;
        }()
    };

    myCharts.setOption(option);
}

/*5、饼状图*/
function makePie(divId,legend_data,series_data,title_text){
    var myCharts = echarts.init(document.getElementById(divId),'castheme');
    option = {
        /*        title : {
         text: title_text,
         subtext: '纯属虚构',
         x:'center'
         },*/
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x : 'center',

            data:legend_data
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
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                lableLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:function () {
                    var serie = [];
                    for (var i=0; i< series_data.length; i++){
                        var item = {
                            value : series_data[i].data,
                            name : series_data[i].name
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
function makeRadar(divId,legend_data,series_data,indicator_data,shape_data,title_data) {
    var myCharts = echarts.init(document.getElementById(divId),'castheme');

    option = {
        tooltip: {
        },
        legend: {
            show:true,
            data:legend_data,
            x:"center"
        },
        radar: {
            indicator: indicator_data,
            shape:shape_data,
            radius:"80"
        },
        series: [{
            name: title_data,
            type: 'radar',
            data:function () {
                var serie = [];
                for (var i=0; i< series_data.length; i++){
                    var item = {
                        value : series_data[i].value,
                        name : series_data[i].name
                    };
                    serie.push(item);
                }
                return serie;
            }()
        }]
    };

    myCharts.setOption(option);
}

/*7、双轴图*/
function makeDoubleShaft(divId,data_xAxis,data_yAxis,data_legend,data_series,data_title) {
    var myCharts = echarts.init(document.getElementById(divId),'castheme');

    option = {
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
function makeGuage(divId,data_value,data_unit,title_text) {
    var myCharts = echarts.init(document.getElementById(divId),'castheme');
    option = {
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
function makeCircular(divId,legend_data,series_data){
    var myCharts = echarts.init(document.getElementById(divId),'castheme');

    option = {
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
function makeTreeMap(divId,series_data,name) {
    var myCharts = echarts.init(document.getElementById(divId),'castheme');
    option = {
        tooltip: {},
        series: [{
            name: name,
            type: 'treemap',
            visibleMin: 300,
            data: series_data,
            leafDepth: 2,
            roam: 'move',
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
function makeText(divID,text_data){
    var textData = "<textarea class='cas-textarea overflowY'>"+text_data+"</textarea>";
    $("#"+divID).append(textData);
}

/*报警信息*/
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

/*12、表格信息*/
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

/*13、进度条*/
function makeProgressBar(divID,series_data) {
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
    $("#"+divID).append(progressBar);
}

/*14、单值*/
function makeSingle(divID,single_data){
    var singlevalue = '<div class="cas-chart-container unitvalue-round">'+
        '<div class="unitvalue-rondLine">'+
        '<div class="unitvalue-ball"></div>'+
        '</div>'+
        '<div class="unitvalue-bg">'+
        '<p>'+single_data+'</p>'+
        '</div>'+
        '</div>';
    $("#"+divID).append(singlevalue);
};

function makeMeter(Id,meterType,meterOption) {
    switch (meterType) {
        case "heatmap":
            makeHeatmap(Id,Data.xAxis,Data.yAxis,Data.series);
            break;
        case "unitvalue":
            makeUnitvalue(Id, Data.total);
            break;
        case "line":
            makeLine(Id, Data.tooltip, Data.legend, Data.backgroundColor, Data.grid, Data.toolbox, Data.xAxis, Data.yAxis, Data.dataZoom, Data.seriesUsual,Data.series);
            break;
        case "bar":
            makeBar(Id, Data.xAxis, Data.legend, Data.series, Data.title);
            break;
        case "pie":
            makePie(Id,Data.legend,Data.series,Data.title);
            break;
        case "radar":
            makeRadar(Id,Data.legend, Data.series,Data.indicator,Data.shape, Data.title);
            break;
        case "double_shaft":
            makeDoubleShaft(Id,Data.xAxis,Data.yAxis,Data.legend,Data.series,Data.title);
            break;
        case "gauge":
            makeGuage(Id, Data.value, Data.unit, Data.title);
            break;
        case "circular":
            makeCircular(Id, Data.legend, Data.series,Data.title);
            break;
        case "treemap":
            makeTreeMap(Id, Data.series,Data.name);
            break;
        case "text":
            makeText(Id, Data.data);
            break;
        case "alert":
            makeAlert(Id, Data.series);
            break;
        case "table":
            makeTable(Id, Data.thead,Data.tbody);

            break;
        case "progressbar":
            makeProgressBar(Id, Data.series);
            break;
        case "single":
            makeSingle(Id, Data.value);
            break;
        default:
    }
}
