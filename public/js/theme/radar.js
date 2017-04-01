/**
 * Created by Lenovo on 2016/11/1.
 */
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

