/**
 * Created by Lenovo on 2016/11/2.
 */
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
