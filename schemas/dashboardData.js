/**
 * Created by wubin on 2016/12/27.
 */
var dashboardData = [
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
                    data:
                        [
                            {
                                legend:"uptime_value",
                                queryInfo:{
                                    database:"collectd",
                                    measurements:"uptime_value",
                                    serverSource:"192.168.1.79",
                                    port:"8086",
                                    tagKeysValue:{
                                        host:"192.168.1.79",
                                        type:"uptime",
                                    }
                                }

                            }
                        ]
                },{
                title:"load_shortterm",
                id:"load_shortterm",
                span:3,
                meterType:"unitvalue",
                data:
                    [
                        {
                            legend:"load_shortterm",
                            queryInfo:{
                                database:"collectd",
                                measurements:"load_shortterm",
                                serverSource:"192.168.1.79",
                                port:"8086",
                                tagKeysValue:{
                                    host:"192.168.1.79",
                                    type:"load",
                                    type_instance:"relative"
                                }
                            }

                        }
                    ]
            },{
                title:"load_midterm",
                id:"load_midterm",
                span:3,
                meterType:"unitvalue",
                data:
                    [
                        {
                            legend:"load_midterm",
                            queryInfo:{
                                database:"collectd",
                                measurements:"load_midterm",
                                serverSource:"192.168.1.79",
                                port:"8086",
                                tagKeysValue:{
                                    host:"192.168.1.79",
                                    type:"load",
                                    type_instance:"relative"
                                }
                            }

                        }
                    ]
            },{
                title:"load_longterm",
                id:"load_longterm",
                span:3,
                meterType:"unitvalue",
                data:
                    [
                        {
                            legend:"load_longterm",
                            queryInfo:{
                                database:"collectd",
                                measurements:"load_longterm",
                                serverSource:"192.168.1.79",
                                port:"8086",
                                tagKeysValue:{
                                    host:"192.168.1.79",
                                    type:"load",
                                    type_instance:"relative"
                                }
                            }

                        }
                    ]
            }
        ]
    },
    {
        groupName:"集群柱状图",
        rowList:"rowList2",
        meters:
            [
                {
                    title:"disk_io_time",
                    id:"disk_io_time",
                    span:12,
                    meterType:"bar",
                    data:
                        [
                            {
                                legend:"sda",
                                queryInfo:{
                                    database:"collectd",
                                    measurements:"disk_io_time",
                                    serverSource:"192.168.1.79",
                                    port:"8086",
                                    tagKeysValue:{
                                        host:"192.168.1.79",
                                        instance:"sda",
                                        type:"disk_io_time"
                                    }
                                }
                            }, {
                                legend:"sda1",
                                queryInfo:{
                                    database:"collectd",
                                    measurements:"disk_io_time",
                                    serverSource:"192.168.1.79",
                                    port:"8086",
                                    tagKeysValue:{
                                        host:"192.168.1.79",
                                        instance:"sda1",
                                        type:"disk_io_time"
                                    }
                                }

                            },{
                            legend:"sda2",
                            queryInfo:{
                                database:"collectd",
                                measurements:"disk_io_time",
                                serverSource:"192.168.1.79",
                                port:"8086",
                                tagKeysValue:{
                                    host:"192.168.1.79",
                                    instance:"sda2",
                                    type:"disk_io_time"
                                }
                            }
                        },{
                            legend:"sda3",
                            queryInfo:{
                                database:"collectd",
                                measurements:"disk_io_time",
                                serverSource:"192.168.1.79",
                                port:"8086",
                                tagKeysValue:{
                                    host:"192.168.1.79",
                                    instance:"sda3",
                                    type:"disk_io_time"
                                }
                            }
                        }
                        ]
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
                    data:
                        [
                            {
                                legend:"buffered",
                                queryInfo:{
                                    database:"collectd",
                                    measurements:"memory_value",
                                    serverSource:"192.168.1.79",
                                    port:"8086",
                                    tagKeysValue:{
                                        host:"192.168.1.79",
                                        type:"memory",
                                        type_instance:"buffered"
                                    }
                                }
                            }, {
                            legend:"free",
                            queryInfo:{
                                database:"collectd",
                                measurements:"memory_value",
                                serverSource:"192.168.1.79",
                                port:"8086",
                                tagKeysValue:{
                                    host:"192.168.1.79",
                                    type:"memory",
                                    type_instance:"free"
                                }
                            }
                        },{
                            legend:"used",
                            queryInfo:{
                                database:"collectd",
                                measurements:"memory_value",
                                serverSource:"192.168.1.79",
                                port:"8086",
                                tagKeysValue:{
                                    host:"192.168.1.79",
                                    type:"memory",
                                    type_instance:"used"
                                }
                            }
                        },{
                            legend:"slab_unrecl",
                            queryInfo:{
                                database:"collectd",
                                measurements:"memory_value",
                                serverSource:"192.168.1.79",
                                port:"8086",
                                tagKeysValue:{
                                    host:"192.168.1.79",
                                    type:"memory",
                                    type_instance:"slab_unrecl"
                                }
                            }
                        },{
                            legend:"slab_recl",
                            queryInfo:{
                                database:"collectd",
                                measurements:"memory_value",
                                serverSource:"192.168.1.79",
                                port:"8086",
                                tagKeysValue:{
                                    host:"192.168.1.79",
                                    type:"memory",
                                    type_instance:"slab_recl"
                                }
                            }
                        },{
                            legend:"cached",
                            queryInfo:{
                                database:"collectd",
                                measurements:"memory_value",
                                serverSource:"192.168.1.79",
                                port:"8086",
                                tagKeysValue:{
                                    host:"192.168.1.79",
                                    type:"memory",
                                    type_instance:"cached"
                                }
                            }
                        }
                        ]
                },{
                title:"cpu_value",
                id:"cpu_value",
                span:6,
                meterType:"pie",
                data:
                    [
                        {
                        legend:"nice",
                        queryInfo:{
                            database:"collectd",
                            measurements:"cpu_value",
                            serverSource:"192.168.1.79",
                            port:"8086",
                            tagKeysValue:{
                                host:"192.168.1.79",
                                type:"cpu",
                                type_instance:"nice"
                            }
                        }
                    },{
                        legend:"system",
                        queryInfo:{
                            database:"collectd",
                            measurements:"cpu_value",
                            serverSource:"192.168.1.79",
                            port:"8086",
                            tagKeysValue:{
                                host:"192.168.1.79",
                                type:"cpu",
                                type_instance:"system"
                            }
                        }
                    },{
                        legend:"user",
                        queryInfo:{
                            database:"collectd",
                            measurements:"cpu_value",
                            serverSource:"192.168.1.79",
                            port:"8086",
                            tagKeysValue:{
                                host:"192.168.1.79",
                                type:"cpu",
                                type_instance:"user"
                            }
                        }
                    },{
                        legend:"wait",
                        queryInfo:{
                            database:"collectd",
                            measurements:"cpu_value",
                            serverSource:"192.168.1.79",
                            port:"8086",
                            tagKeysValue:{
                                host:"192.168.1.79",
                                type:"cpu",
                                type_instance:"wait"
                            }
                        }
                    }
                    ]
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
                data: [
                    {
                        legend: "sda",
                        queryInfo: {
                            database: "collectd",
                            measurements: "disk_read",
                            serverSource: "192.168.1.79",
                            port: "8086",
                            tagKeysValue: {
                                host: "192.168.1.79",
                                type: "disk_merged",
                                instance: "sda"
                            }
                        }
                    },
                    {
                        legend: "sda3",
                        queryInfo: {
                            database: "collectd",
                            measurements: "disk_read",
                            serverSource: "192.168.1.79",
                            port: "8086",
                            tagKeysValue: {
                                host: "192.168.1.79",
                                type: "disk_merged",
                                instance: "sda3"
                            }
                        }
                    }
                ]
            },
            {
                title: "disk_time",
                id: "disk_time",
                span: 3,
                meterType: "line",
                data: [
                    {
                        legend: "sda",
                        queryInfo: {
                            database: "collectd",
                            measurements: "disk_read",
                            serverSource: "192.168.1.79",
                            port: "8086",
                            tagKeysValue: {
                                host: "192.168.1.79",
                                type: "disk_time",
                                instance: "sda"
                            }
                        }
                    },
                    {
                        legend: "sda1",
                        queryInfo: {
                            database: "collectd",
                            measurements: "disk_read",
                            serverSource: "192.168.1.79",
                            port: "8086",
                            tagKeysValue: {
                                host: "192.168.1.79",
                                type: "disk_time",
                                instance: "sda1"
                            }
                        }
                    },
                    {
                        legend: "sda2",
                        queryInfo: {
                            database: "collectd",
                            measurements: "disk_read",
                            serverSource: "192.168.1.79",
                            port: "8086",
                            tagKeysValue: {
                                host: "192.168.1.79",
                                type: "disk_time",
                                instance: "sda2"
                            }
                        }
                    },
                    {
                        legend: "sda3",
                        queryInfo: {
                            database: "collectd",
                            measurements: "disk_read",
                            serverSource: "192.168.1.79",
                            port: "8086",
                            tagKeysValue: {
                                host: "192.168.1.79",
                                type: "disk_time",
                                instance: "sda3"
                            }
                        }
                    }]},
                    {
                        title: "disk_ops",
                        id: "disk_ops",
                        span: 3,
                        meterType: "line",
                        data: [
                            {
                                legend: "sda",
                                queryInfo: {
                                    database: "collectd",
                                    measurements: "disk_read",
                                    serverSource: "192.168.1.79",
                                    port: "8086",
                                    tagKeysValue: {
                                        host: "192.168.1.79",
                                        type: "disk_ops",
                                        instance: "sda"
                                    }
                                }
                            },
                            {
                                legend: "sda1",
                                queryInfo: {
                                    database: "collectd",
                                    measurements: "disk_read",
                                    serverSource: "192.168.1.79",
                                    port: "8086",
                                    tagKeysValue: {
                                        host: "192.168.1.79",
                                        type: "disk_ops",
                                        instance: "sda1"
                                    }
                                }
                            },
                            {
                                legend: "sda2",
                                queryInfo: {
                                    database: "collectd",
                                    measurements: "disk_read",
                                    serverSource: "192.168.1.79",
                                    port: "8086",
                                    tagKeysValue: {
                                        host: "192.168.1.79",
                                        type: "disk_ops",
                                        instance: "sda2"
                                    }
                                }
                            },
                            {
                                legend: "sda3",
                                queryInfo: {
                                    database: "collectd",
                                    measurements: "disk_read",
                                    serverSource: "192.168.1.79",
                                    port: "8086",
                                    tagKeysValue: {
                                        host: "192.168.1.79",
                                        type: "disk_ops",
                                        instance: "sda3"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        title: "disk_octets",
                        id: "disk_octets",
                        span: 3,
                        meterType: "line",
                        data: [
                            {
                                legend: "sda",
                                queryInfo: {
                                    database: "collectd",
                                    measurements: "disk_read",
                                    serverSource: "192.168.1.79",
                                    port: "8086",
                                    tagKeysValue: {
                                        host: "192.168.1.79",
                                        type: "disk_octets",
                                        instance: "sda"
                                    }
                                }
                            },
                            {
                                legend: "sda1",
                                queryInfo: {
                                    database: "collectd",
                                    measurements: "disk_read",
                                    serverSource: "192.168.1.79",
                                    port: "8086",
                                    tagKeysValue: {
                                        host: "192.168.1.79",
                                        type: "disk_octets",
                                        instance: "sda1"
                                    }
                                }
                            },
                            {
                                legend: "sda2",
                                queryInfo: {
                                    database: "collectd",
                                    measurements: "disk_read",
                                    serverSource: "192.168.1.79",
                                    port: "8086",
                                    tagKeysValue: {
                                        host: "192.168.1.79",
                                        type: "disk_octets",
                                        instance: "sda2"
                                    }
                                }
                            },
                            {
                                legend: "sda3",
                                queryInfo: {
                                    database: "collectd",
                                    measurements: "disk_read",
                                    serverSource: "192.168.1.79",
                                    port: "8086",
                                    tagKeysValue: {
                                        host: "192.168.1.79",
                                        type: "disk_octets",
                                        instance: "sda3"
                                    }
                                }
                            }
                        ]
                    }
                ]
            },{
        groupName: "3Dmemory_value",
        rowList: "rowList5",
        meters: [
            {
                title:"3Dmemory_value",
                id:"3DPieMemory_value",
                span:6,
                meterType:"3Dpie",
                data:
                    [
                        {
                            legend:"buffered",
                            queryInfo:{
                                database:"collectd",
                                measurements:"memory_value",
                                serverSource:"192.168.1.79",
                                port:"8086",
                                tagKeysValue:{
                                    host:"192.168.1.79",
                                    type:"memory",
                                    type_instance:"buffered"
                                }
                            }
                        },{
                        legend:"free",
                        queryInfo:{
                            database:"collectd",
                            measurements:"memory_value",
                            serverSource:"192.168.1.79",
                            port:"8086",
                            tagKeysValue:{
                                host:"192.168.1.79",
                                type:"memory",
                                type_instance:"free"
                            }
                        }
                    },{
                        legend:"used",
                        queryInfo:{
                            database:"collectd",
                            measurements:"memory_value",
                            serverSource:"192.168.1.79",
                            port:"8086",
                            tagKeysValue:{
                                host:"192.168.1.79",
                                type:"memory",
                                type_instance:"used"
                            }
                        }
                    },{
                        legend:"slab_unrecl",
                        queryInfo:{
                            database:"collectd",
                            measurements:"memory_value",
                            serverSource:"192.168.1.79",
                            port:"8086",
                            tagKeysValue:{
                                host:"192.168.1.79",
                                type:"memory",
                                type_instance:"slab_unrecl"
                            }
                        }
                    },{
                        legend:"slab_recl",
                        queryInfo:{
                            database:"collectd",
                            measurements:"memory_value",
                            serverSource:"192.168.1.79",
                            port:"8086",
                            tagKeysValue:{
                                host:"192.168.1.79",
                                type:"memory",
                                type_instance:"slab_recl"
                            }
                        }
                    },{
                        legend:"cached",
                        queryInfo:{
                            database:"collectd",
                            measurements:"memory_value",
                            serverSource:"192.168.1.79",
                            port:"8086",
                            tagKeysValue:{
                                host:"192.168.1.79",
                                type:"memory",
                                type_instance:"cached"
                            }
                        }
                    }
                    ]
            },{
                title:"3Dmemory_value",
                id:"3DBarMemory_value",
                span:6,
                meterType:"3Dbar",
                data:
                    [
                        {
                            legend:"buffered",
                            queryInfo:{
                                database:"collectd",
                                measurements:"memory_value",
                                serverSource:"192.168.1.79",
                                port:"8086",
                                tagKeysValue:{
                                    host:"192.168.1.79",
                                    type:"memory",
                                    type_instance:"buffered"
                                }
                            }
                        },{
                        legend:"used",
                        queryInfo:{
                            database:"collectd",
                            measurements:"memory_value",
                            serverSource:"192.168.1.79",
                            port:"8086",
                            tagKeysValue:{
                                host:"192.168.1.79",
                                type:"memory",
                                type_instance:"used"
                            }
                        }
                    },{
                        legend:"cached",
                        queryInfo:{
                            database:"collectd",
                            measurements:"memory_value",
                            serverSource:"192.168.1.79",
                            port:"8086",
                            tagKeysValue:{
                                host:"192.168.1.79",
                                type:"memory",
                                type_instance:"cached"
                            }
                        }
                    }
                    ]
            }
        ]
            },{
                groupName: "热力图与报警",
                rowList: "rowList6",
                meters: [
                    {
                        title: "heatmap_cpu",
                        id: "heatmap_cpu",
                        span: 6,
                        meterType: "heatmap",
                        rule:{
                                 levelArray:[0,400000,800000,1200000,1600000,2000000,9900000],
                                 colorArray:['white','grey','yellow','blue','green','red']
                                },
                                data: [
                                    {
                                        queryInfo: {
                                            database: "collectd",
                                            measurements: "cpu_value",
                                            serverSource: "192.168.1.79",
                                            groupBy:"192.168.1.79",
                                            port: "8086",
                                            tagKeysValue: {
                                                type_instance:"idle"
                                            }
                                        }
                                    }
                                ]
                            }, {
                                title:"uptime_alert",
                                id:"uptime_alert",
                                span:3,
                                meterType:"alert",
                                rule:{
                                    threshold:20000
                                },
                                data:
                                    [
                                        {
                                            legend:"uptime_value",
                                            queryInfo:{
                                                database:"collectd",
                                                measurements:"uptime_value",
                                                serverSource:"192.168.1.79",
                                                port:"8086",
                                                tagKeysValue:{
                                                    host:"192.168.1.79",
                                                    type:"uptime",
                                                }
                                            }
                                        }
                                    ]
                            },{
                                title:"cpu_valueSingle",
                                id:"cpu_valueSingle",
                                span:3,
                                meterType:"unitvalue",
                                data:
                                    [
                                        {
                                            legend:"cpu_valueSingle",
                                            queryInfo:{
                                                database:"collectd",
                                                measurements:"cpu_value",
                                                serverSource:"192.168.1.79",
                                                port:"8086",
                                                tagKeysValue:{
                                                    host:"@host",
                                                    type_instance:"@type_instance",
                                                }
                                            }
                                        }
                                    ]
                    }
                ]
                }
        ]


        module.exports = dashboardData;