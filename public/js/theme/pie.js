/**
 * Created by Lenovo on 2016/11/1.
 */

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


