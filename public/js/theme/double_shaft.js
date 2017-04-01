/**
 * Created by Lenovo on 2016/11/1.
 */
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