/**
 * Created by Lenovo on 2016/11/1.
 */
function makeLine(divId,xAxis_date,legend_data,series_data,color_data){
    console.log(color_data);
    var myCharts = echarts.init(document.getElementById(divId),'castheme');
    option = {
        tooltip: {
            trigger: 'axis',
            show:'true',                //（组件）设置提示框的显示与隐藏
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:legend_data,
            left:'auto',    //（组件）图例组件的位置设置
            right:'auto',   //（组件）图例组件的位置设置
            top:'auto',     //（组件）图例组件的位置设置
            bottom:'auto'   //（组件）图例组件的位置设置
        },
        backgroundColor:'red', //（样式）设置图表背景颜色
        grid: {
            left: '3%',
            right: '4%',
            top:'0%',
            bottom: '3%',
        },
        /*(组件)自定义工具栏*/
        toolbox: {
            /*(组件)设置工具栏大小*/
            itemSize:15,
            feature: {
                /*(组件)保存图片*/
                saveAsImage: {
                    show:true,
                    title:'保存为图片'
                },
                /*(组件)配置项还原*/
                restore:{
                    show:true,
                    title:'还原'
                },
                /*(组件)数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新*/
                dataView:{
                    show:true,
                    title:'还原'
                },
                /*(组件)数据区域缩放。目前只支持直角坐标系的缩放*/
                dataZoom:{
                    show:true,
                    title:'还原'
                },
                /*(组件)动态类型切换*/
                magicType:{
                    show:true,
                    type: ['line', 'bar', 'stack', 'tiled']
                },
                /*(组件)选框组件的控制按钮*/
                brush:{
                    show:true,
                    type: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear']
                }
            }
        },
        xAxis: {
            type: 'time', //（坐标轴）坐标轴数据类型
            data: xAxis_date,
            position:'bottom', //（坐标轴）坐标轴位置
            name:'日期'  //（坐标轴）坐标轴名称
        },
        yAxis: {
            type: 'value',    //（坐标轴）坐标轴数据类型
            position:'left',  //（坐标轴）坐标轴位置
            name:'磁盘大小',     //（坐标轴）坐标轴名称
            /*（坐标轴）设置坐标轴单位*/
            axisLabel: {
                formatter: '{value} GB'
            },
            interval:90,   //（坐标轴）设置坐标轴的分隔大小
            max:540       //（坐标轴）设置坐标轴的最大值
        },
        /*区域进行缩放*/
        dataZoom: {
            type: 'slider',
            start: 0,
            end: 100
        },
        series: function () {
            var serie = [];
            for (var i=0; i< series_data.length; i++){
                var item = {
                    name : series_data[i].name,
                    type : "line",
                    data : series_data[i].data,
                    /*（样式）设置填充样式的透明度*/
                    areaStyle: {normal: {
                        opacity:0.5,  //填充透明度
                        color: 'red'  //填充颜色
                    }},
                    lineStyle:{
                        normal:{
                            color: color_data,  //（样式）设置线条的颜色
                            width:5             //(样式)设置线条的粗细
                        }
                    },
                    /*(样式)设置图表标记-点标记*/
                    markPoint:{
                        symbol:'circle',  //(样式)标记图标的样式
                        symbolSize:10,    //(样式)标记图表的大小
                        data: [
                            /*(样式)设置需要标记的数值，标记的名称*/
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                            ]
                    },
                    /*(样式)设置图表标记-线标记*/
                     markLine:{
                         data: [
                             /*(样式)设置需要标记的数值，标记的名称*/
                             {type: 'max', name: '最大值'},
                             {type: 'min', name: '最小值'}
                         ]
                     },
                    animation: false

                };
                serie.push(item);
            }
            return serie;
        }()
    };

    myCharts.setOption(option);
}