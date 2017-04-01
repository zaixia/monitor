/**
 * Created by Lenovo on 2016/11/25.
 */
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