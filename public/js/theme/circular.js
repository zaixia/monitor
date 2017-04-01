/**
 * Created by Lenovo on 2016/11/16.
 */
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