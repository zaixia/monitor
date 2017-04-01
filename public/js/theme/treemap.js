
/**
 * Created by Lenovo on 2016/11/1.
 */
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
