/**
 * Created by Lenovo on 2016/11/1.
 */
function makeHeatmap(divId,xAxis_data,yAxis_data,series_data) {
    var myCharts = echarts.init(document.getElementById(divId),'castheme');
    var data = series_data.map(function (item) {
        return [item[1], item[0], item[2] || '-'];
    });
    option = {
        tooltip: {
            position: 'right'
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

