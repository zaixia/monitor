/**
 * Created by wubin on 2016/12/27.
 *
 * 保存了每个仪表的初始样式数据
 */
var dashboardStyle = [
    {
        groupName:"集群单值表",
        rowList:"rowList1",
        meters:
            [
                {
                    title:"uptime_value",
                    id:"uptime_value",
                    span:3,
                    meterType:"unitvalue",
                    option:{
                        initialStyleData: {
                            title : {
                                textStyle : {
                                    color : '#2c343c',
                                    fontWeight : 'normal',
                                    fontSize : 20
                                }
                            },
                            series : {
                                radius : {
                                    in_R : '80%',
                                    out_R : '75%'
                                },
                                data : {
                                    itemStyle : {
                                        normal : {
                                            color : '#1E90FF'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },{
                title:"load_shortterm",
                id:"load_shortterm",
                span:3,
                meterType:"unitvalue",
                option:{
                    initialStyleData: {
                        title : {
                            textStyle : {
                                color : '#2c343c',
                                fontWeight : 'bolder',
                                fontSize : 60
                            }
                        },
                        series : {
                            radius : {
                                in_R : '80%',
                                out_R : '75%'
                            },
                            data : {
                                itemStyle : {
                                    normal : {
                                        color : '#1E90FF'
                                    }
                                }
                            }
                        }
                    }

                }
            },{
                title:"load_ midterm",
                id:"load_ midterm",
                span:3,
                meterType:"unitvalue",
                option:{
                    initialStyleData: {
                        title : {
                            textStyle : {
                                color : '#2c343c',
                                fontWeight : 'bolder',
                                fontSize : 60
                            }
                        },
                        series : {
                            radius : {
                                in_R : '80%',
                                out_R : '75%'
                            },
                            data : {
                                itemStyle : {
                                    normal : {
                                        color : '#1E90FF'
                                    }
                                }
                            }
                        }
                    }
                }
            },{
                title:"load_ longterm",
                id:"load_ longterm",
                span:3,
                meterType:"unitvalue",
                option:{
                    initialStyleData: {
                        title : {
                            textStyle : {
                                color : '#2c343c',
                                fontWeight : 'bolder',
                                fontSize : 60
                            }
                        },
                        series : {
                            radius : {
                                in_R : '80%',
                                out_R : '75%'
                            },
                            data : {
                                itemStyle : {
                                    normal : {
                                        color : '#1E90FF'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]
    },
    {
        groupName:"集群折线图",
        rowList:"rowList2",
        meters:
            [
                {
                    title:"disk_io_time",
                    id:"disk_io_time",
                    span:12,
                    meterType:"bar",
                    option:{
                        initialStyleData: {
                            legend : {
                                textStyle : {
                                    color : '#333',
                                    fontWeight : 'normal',
                                    fontSize : 12
                                }
                            },
                            backgroundColor : 'transparent',
                            series : {
                                itemStyle : {
                                    normal : {
                                        opacity : 1
                                    }
                                }
                            }
                        }
                    }
                }
            ]
    }, {
        groupName:"集群雷达图",
        rowList:"rowList3",
        meters:
            [
                {
                    title:"memory_value",
                    id:"memory_value",
                    span:6,
                    meterType:"radar",
                    option:{
                        initialStyleData: {
                            legend : {
                                textStyle : {
                                    color : '#333',
                                    fontSize : 12
                                }
                            },
                            backgroundColor : 'transparent',
                            radar : {
                                name : {
                                    textStyle : {
                                        fontSize : 12,
                                        fontWeight : 'normal',
                                        color : '#333'
                                    }
                                },
                            },
                            series : {
                                lineStyle : {
                                    normal : {
                                        color : '#000',
                                        width : 1,
                                        type : 'solid'

                                    }
                                },
                                areaStyle : {
                                    normal : {
                                        color : '#eee',
                                        opacity : 1
                                    }
                                }
                            }

                        }
                    }
                },{
                title:"cpu_value",
                id:"cpu_value",
                span:6,
                meterType:"pie",
                option:{
                    initialStyleData: {
                        legend : {
                            textStyle : {
                                color : '#333',
                                fontSize : 12,
                                fontWeight : 'normal'
                            }
                        },
                        series : {
                            label : {
                                normal : {
                                    textStyle : {
                                       color : '#333',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        }


                    }
                }
                }
            ]
    },
    {
        groupName: "disk_read",
        rowList: "rowList4",
        meters: [
            {
                title: "disk_merged",
                id: "disk_merged",
                span: 3,
                meterType: "line",
                option: {
                    initialStyleData: {
                        legend : {
                            textStyle : {
                                color : '#333',
                                fontSize : 12,
                                fontWeight : 'normal'
                            }
                        },
                        backgroundColor : 'transparent',
                        series : {
                            lineStyle : {
                                normal : {
                                    width : 1,
                                    type: 'solid',
                                    opacity : 0.5

                                }
                            },
                            smooth : false,
                            areaStyle : {
                                normal : {
                                    opacity : 0
                                }
                            }
                        }




                    }
                }
            },
            {
                title: "disk_time",
                id: "disk_time",
                span: 3,
                meterType: "line",
                option: {
                    initialStyleData: {
                        legend : {
                            textStyle : {
                                color : '#333',
                                fontSize : 12,
                                fontWeight : 'normal'
                            }
                        },
                        backgroundColor : 'transparent',
                        series : {
                            lineStyle : {
                                normal : {
                                    width : 1,
                                    type: 'solid',
                                    opacity : 0.5

                                }
                            },
                            smooth : false,
                            areaStyle : {
                                normal : {
                                    opacity : 0
                                }
                            }
                        }

                    }
                }
            },{
                title: "disk_ops",
                id: "disk_ops",
                span: 3,
                meterType: "line",
                option: {
                    initialStyleData: {
                        legend : {
                            textStyle : {
                                color : '#333',
                                fontSize : 12,
                                fontWeight : 'normal'
                            }
                        },
                        backgroundColor : 'transparent',
                        series : {
                            lineStyle : {
                                normal : {
                                    width : 1,
                                    type: 'solid',
                                    opacity : 0.5

                                }
                            },
                            smooth : false,
                            areaStyle : {
                                normal : {
                                    opacity : 0
                                }
                            }
                        }

                    }
                }
                },{
                title: "disk_octets",
                id: "disk_octets",
                span: 3,
                meterType: "line",
                option: {
                    initialStyleData: {
                        legend : {
                            textStyle : {
                                color : '#333',
                                fontSize : 12,
                                fontWeight : 'normal'
                            }
                        },
                        backgroundColor : 'transparent',
                        series : {
                            lineStyle : {
                                normal : {
                                    width : 1,
                                    type: 'solid',
                                    opacity : 0.5

                                }
                            },
                            smooth : false,
                            areaStyle : {
                                normal : {
                                    opacity : 0
                                }
                            }
                        }

                    }
                }
                 }
                ]
            },
    {
        groupName: "3Dmemory_value",
        rowList: "rowList5",
        meters : [
            {
                title:"3Dmemory_value",
                id:"3DPieMemory_value",
                span:6,
                meterType:"3Dpie",
                option : {
                    initialStyleData: {
                        plotOptions: {
                            pie: {
                                depth: 35
                            }
                        },
                        legend : {
                            itemStyle :{
                                color : '#333333',
                                fontSize :'12px',
                                fontWeight : 'bold'
                            }
                        },
                        series : {
                            dataLabels :{
                                style : {
                                    color : '#fff',
                                    fontSize : '11px',
                                    fontWeight : 'bold',

                                }
                            }
                        }
                    }
                }
            },{
                title:"3Dmemory_value",
                id:"3DBarMemory_value",
                span:6,
                meterType:"3Dbar",
                option : {
                    initialStyleData: {
                        legend : {
                            itemStyle : {
                                fontSize : '12px',
                                color : '#333333'
                            }
                        }
                    }

                }
            }
        ]

    },
    {
        groupName: "热力图与报警",
        rowList: "rowList6",
        meters : [
            {
                title: "heatmap_cpu",
                id: "heatmap_cpu",
                span: 6,
                meterType: "heatmap",
                option : {
                    initialStyleData : {
                        legend : {
                            textStyle : {
                                color : '#333',
                                fontSize : '12'
                            }
                        },
                        backgroundColor : 'transparent',
                        series : {
                            label : {
                                normal : {
                                    show : false
                                }
                            }
                        }
                    }
                }
            },{
                title:"uptime_alert",
                id:"uptime_alert",
                span:3,
                meterType:"alert",
                option : {

                }
            },{
                title:"cpu_valueSingle",
                id:"cpu_valueSingle",
                span:3,
                meterType:"unitvalue",
                option : {
                    initialStyleData: {
                        title : {
                            textStyle : {
                                color : '#2c343c',
                                fontWeight : 'bolder',
                                fontSize : 60
                            }
                        },
                        series : {
                            radius : {
                                in_R : '80%',
                                out_R : '75%'
                            },
                            data : {
                                itemStyle : {
                                    normal : {
                                        color : '#1E90FF'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]
    }

        ]




        module.exports = dashboardStyle;

