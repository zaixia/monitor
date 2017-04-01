export function castheme(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
};
castheme(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    echarts.registerTheme('castheme', {
        "color": [//主题颜色
            "#7eb26d",
            "#eab839",
            "#6ed0e0",
            "#ef843c",
            "#e24d42",
            "#1f78c1",
            "#ba43a9",
            "#705da0"
        ],
        "backgroundColor": "rgba(0,0,0,0)",//背景
        "textStyle": {},
        "title": {//标题
            "textStyle": {
                "color": "#ffffff"
            },
            "subtextStyle": {
                "color": "#aaaaaa"
            }
        },
        "line": {//折线图
            "itemStyle": {
                "normal": {
                    "borderWidth": 1
                }
            },
            "lineStyle": {
                "normal": {
                    "width": 2
                }
            },
            "symbolSize": 4,
            "symbol": "emptyCircle",
            "smooth": false
        },
        "radar": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 1
                }
            },
            "lineStyle": {
                "normal": {
                    "width": 2
                }
            },
            "symbolSize": 4,
            "symbol": "emptyCircle",
            "smooth": false
        },
        "bar": {//柱形图
            "itemStyle": {
                "normal": {
                    "barBorderWidth": "0",
                    "barBorderColor": "#ffffff"
                },
                "emphasis": {
                    "barBorderWidth": "0",
                    "barBorderColor": "#ffffff"
                }
            }
        },
        "pie": {//饼状图
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",

                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#ffffff"
                }
            }
        },
        "scatter": {//散点图
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#ffffff"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#ffffff"
                }
            }
        },
        "boxplot": {//盒图
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#ffffff"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#ffffff"
                }
            }
        },
        "parallel": {//平行面（线）
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#ffffff"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#ffffff"
                }
            }
        },
        "sankey": {//思维导图
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#ffffff"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#ffffff"
                }
            }
        },
        "funnel": {//漏斗图
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#ffffff"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#ffffff"
                }
            }
        },
        "gauge": {//仪表盘测量图
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#ffffff"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#ffffff"
                }
            }
        },
        "candlestick": {//k线图
            "itemStyle": {
                "normal": {
                    "color": "#c12e34",
                    "color0": "#2b821d",
                    "borderColor": "#c12e34",
                    "borderColor0": "#2b821d",
                    "borderWidth": 1
                }
            }
        },
        "graph": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#ffffff"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": 1,
                    "color": "#aaaaaa"
                }
            },
            "symbolSize": 4,
            "symbol": "emptyCircle",
            "smooth": false,
            "color": [
                "#7eb26d",
                "#eab839",
                "#6ed0e0",
                "#ef843c",
                "#e24d42",
                "#1f78c1",
                "#ba43a9",
                "#705da0"
            ],
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#ffffff"
                    }
                }
            }
        },
        "map": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#dddddd",
                    "borderColor": "#eeeeee",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "rgba(230,182,0,1)",
                    "borderColor": "#dddddd",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#c12e34"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(193,46,52)"
                    }
                }
            }
        },
        "geo": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#dddddd",
                    "borderColor": "#eeeeee",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "rgba(230,182,0,1)",
                    "borderColor": "#dddddd",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#c12e34"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(193,46,52)"
                    }
                }
            }
        },
        "categoryAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#ffffff"
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                }
            }
        },
        "valueAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#ffffff"
                }
            },
            "splitLine": {//水平辅助线
                "show": true,
                "lineStyle": {
                    "color": [
                        "rgba(255,255,255,0.1)"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                }
            }
        },
        "logAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#ffffff"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#ffffff"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                }
            }
        },
        "timeAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#ffffff"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#ffffff"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#ffffff"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                }
            }
        },
        "toolbox": {
            "iconStyle": {
                "normal": {
                    "borderColor": "#eeeeee"
                },
                "emphasis": {
                    "borderColor": "#1e90ff"
                }
            }
        },
        "legend": {
            "textStyle": {
                "color": "#cccccc"
            }
        },
        "tooltip": {
            "axisPointer": {
                "lineStyle": {
                    "color": "#cccccc",
                    "width": 1
                },
                "crossStyle": {
                    "color": "#cccccc",
                    "width": 1
                }
            }
        },
        "timeline": {
            "lineStyle": {
                "color": "#005eaa",
                "width": 1
            },
            "itemStyle": {
                "normal": {
                    "color": "#005eaa",
                    "borderWidth": 1
                },
                "emphasis": {
                    "color": "#005eaa"
                }
            },
            "controlStyle": {
                "normal": {
                    "color": "#005eaa",
                    "borderColor": "#005eaa",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "color": "#005eaa",
                    "borderColor": "#005eaa",
                    "borderWidth": 0.5
                }
            },
            "checkpointStyle": {
                "color": "#005eaa",
                "borderColor": "rgba(49,107,194,0.5)"
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#005eaa"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#005eaa"
                    }
                }
            }
        },
        "visualMap": {
            "color": [
                "#1790cf",
                "#a2d4e6"
            ]
        },
        "dataZoom": {
            "backgroundColor": "rgba(47,69,84,0)",
            "dataBackgroundColor": "rgba(47,69,84,0.3)",
            "fillerColor": "rgba(167,183,204,0.4)",
            "handleColor": "#a7b7cc",
            "handleSize": "100%",
            "textStyle": {
                "color": "#333333"
            }
        },
        "markPoint": {
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#ffffff"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#ffffff"
                    }
                }
            }
        }
    });
});
