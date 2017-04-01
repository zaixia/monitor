/**
 * Created by Lenovo on 2017/2/23.
 */
import { makeMeter } from './makeMeter';

/*获取仪表在仪表组的位置*/
export function getDashboardLocation(dashboardId) {
    $("."+dashboardId).parent().parent().children()
    var index = 0;
    var IdTemp;
    /*先获取仪表组ID*/
    var allClass = $("#"+dashboardId).parent().parent().parent().attr("class").split(" ");
    var dashboardGroupId = allClass[1];
    while(index<$("."+dashboardGroupId).children().length) {
        IdTemp = $("."+dashboardGroupId).children().eq(index).children().eq(1).children().attr("id");
        if(dashboardId != IdTemp) {
            index++;
        }else{
            return index;
        }
    }
    return;
}
/*查找仪表组位置*/
export function  dashboardGroupLcaltion (dashboardGroupId){
    var index = 0;
    var groupIdTemp = [];
    while(index<$(".dashboard").children().length) {
        if($(".dashboard").children().eq(index).children().length == 3){                           /*太疏忽*/
            groupIdTemp = $(".dashboard").children().eq(index).children().eq(2).attr("class").split(" ");
        }else {
            groupIdTemp = $(".dashboard").children().eq(index).children().eq(1).attr("class").split(" ");
        }

        if(dashboardGroupId != groupIdTemp[1]) {
            index++;
        }else{
            return index;
        }
    }
    return ;
}
export function dashboardEdit(){

    //添加仪表组 添加按钮方法
    var echartsTeam;//定义变量 仪表组图层
    $("body").on('click','.addDashboardGroup',function(){
        echartsTeam = layer.open({
            type: 1,
            area: ['500px', 'auto'], //宽高
            content:
            '<form class="form-horizontal add-chartsteam">'+
            '<div class="form-group groupnameInput">'+
            '<label>仪表组名称</label>'+
            '<input class="form-control" type="text">'+
            '</div>'+
            '</form>',
            btn:['添加','取消'],
            yes:function () {
                addChartsTeam();
            }
        });
    });
    /*随机获取仪表组/仪表盘ID*/
    function getID(idType,idUsed) {
        var index = 0;
        var sameId = true;
        var ID = idType + parseInt(Math.random()*10000);
        while(sameId) {
            if(idUsed.length == 0) {
                sameId = false;
            }
            while(index < idUsed.length){
                if(idUsed[index] == ID) {
                    sameId = true;
                    Id = idType+parseInt(Math.random()*10000);
                    break;
                }else {
                    sameId = false;
                }
                index++
            }
        }
        return ID;
    }
    /*添加仪表组*/
     function addChartsTeam() {
         var dashboardIndex;
         var groupname = $(".groupnameInput").children().eq(1).val();
         /*随机生成唯一标识的仪表组序列号*/
         var groupIdUsed = [];
         for (var i=0;i<$(".dashboard").children().length;i++) {
             groupIdUsed.push($(".dashboard").children().eq(i).children().eq(1).attr("class"));
         }
         var dashboardGroupId = getID("dashboardGroupId_",groupIdUsed);
        /*加载仪表组*/
        if(groupname != "" ) {
            var dashboardGroup = "<div class='container-fluid'>" +
                "<div class='cas-toggle-title'>" +
                "<span class='cas-title'>"+groupname+"</span>" +
                "<ul class='cas-title-toolbox'>" +
                "<li class='toggleTitle'><span class='glyphicon glyphicon-resize-small'></span><i>折叠</i></li>" +
                "<li class='addDB'><span class='glyphicon glyphicon-plus'></span><i>创建仪表</i></li>" +
                "<li><span class='glyphicon glyphicon-cog'></span><i>仪表组设置</i></li>" +
                "<li class='btn-open-deletemodal'><span class='glyphicon glyphicon-remove'></span><i>删除仪表组</i></li>" +
                "</ul>" +
                "</div><div class='row "+dashboardGroupId+"'></div>";
            $("#addDashboardGroup").modal('hide');
            //添加仪表组
            $(".dashboard").append(dashboardGroup);
            /*获取仪表组位置*/
            dashboardIndex = dashboardGroupLcaltion (dashboardGroupId);

            /*发送数据到服务端*/
            $.ajax({
                url:"/dashboardArrayAdd",
                type:"GET",
                data:{
                    dashboardArrayObject:{
                        groupName:groupname,           //仪表组名称
                        rowList:dashboardGroupId,      //仪表组序列号
                    },
                    dashboardArraySeq:dashboardIndex  //仪表组位置
                },
                async:false,
                success:function () {
                    console.log("仪表组数据发送成功！！！");
                },
                error:function () {
                    console.log("仪表组数据发送失败！！！");
                }
            });

            $.ajax({
                url:"/boardStyleArrayAdd",
                type:"GET",
                data:{
                    boardStyleArrayObject:{         //仪表组名称
                        rowList:dashboardGroupId     //仪表组序列号
                    },
                    dashboardArraySeq:dashboardIndex  //仪表组位置
                },
                async:false,
                success:function () {
                    console.log("样式数据仪表组发送成功！！！");
                },
                error:function () {
                    console.log("样式数据仪表组发送失败！！！");
                }
            })

            layer.close(echartsTeam); //关闭弹出层
            layer.msg("添加成功",{icon:1});
        }else {
            layer.alert("请填写仪表组名称",{icon:7});
        }
    }

    //删除仪表组方法
    $("body").on('click','.btn-open-deletemodal',function(){//点击删除仪表组按钮
        $("div").removeClass("sign-delete"); //清除标记类名
        $(this).parent().parent().parent().addClass("sign-delete");//添加标记类名
        layer.confirm('删除仪表组，组内仪表将无法恢复，确认删除仪表组？', {
                icon: 7,//感叹号提示图表
                title:'删除仪表组'  //标题
            }, function(index){   //确认删除方法
            var dashboardGroupDeleteId = [];
            dashboardGroupDeleteId = $(".sign-delete").children().eq(1).attr("class").split(" ");
            var dashboardGroupName = $(".sign-delete").children().eq(0).children().eq(0).text();
            var dashboardGroupindex = dashboardGroupLcaltion(dashboardGroupDeleteId[1]);


            $.ajax({
                url:"/dashboardArrayRemove",
                type:"GET",
                data:{
                    dashboardArraySeq:dashboardGroupindex  //仪表组位置
                },
                async:false,
                success:function (data) {
                    console.log("仪表组删除成功！！！");
                },
                error:function () {
                    console.log("仪表组删除失败！！！");
                }
            });

            $.ajax({
                url:"/boardStyleArrayRemove",
                type:"GET",
                data:{
                    dashboardArraySeq:dashboardGroupindex  //仪表组位置
                },
                async:false,
                success:function (data) {
                    console.log("仪表样式数据库中仪表组删除成功！！！");
                },
                error:function () {
                    console.log("仪表样式数据库中仪表组删除失败！！！");
                }
            });


            $(".sign-delete").remove();//删除仪表组
            layer.close(index); //关闭弹出层
        });
    });

    ///***********************************************添加仪表模块****************************************************///

    /*将已经存在的仪表ID存入一个数组*/
    function getIdUsed() {
        var dashboardIdUsed = [];
        for(var i = 0;i <$(this).parent().parent().children().eq(2).children().length;i++) {
            dashboardIdUsed.push($(this).parent().parent().children().eq(2).children().eq(i).children().eq(1).children().attr("id"));
        }
        return dashboardIdUsed;
    }

    /*将仪表配置数据发送给服务端*/
    function sendDataToSever(data,dashboardIndex,dashboardGroupIndex,meterStyle,dashboardGroupId) {
        $.ajax({
            url:"./dashboardFind",
            type:"GET",
            async:false,
            data:{
                meterObject:data,
                dashboardArraySeq:dashboardGroupIndex,
                metersSeq:dashboardIndex
            },
            success:function (data) {
                //console.log(data);
                console.log("仪表数据发送成功！！！");
            },
            error:function () {
                console.log("仪表数据发送失败！！！");
            }
        });

        $.ajax({
           url: '/addStyleData' ,
            type:"GET",
            async:false,
            data:{
                rowList:dashboardGroupId,
                meterStyle:meterStyle
            },
            success:function (data) {
                console.log("样式数据发送成功！！！");
            },
            error:function () {
                console.log("样式数据发送失败！！！");
            }
        });


    }

    /*添加没有数据的空仪表*/
    function addDashboard(meter) {
        /*生成仪表ID*/
        var allClass = $(".selectDBG").next().attr("class").split(" ");
        var dashboardGroupId = allClass[1];         /*获取仪表组ID*/
        /*将各个仪表的id存到dashboardIdUsed*/
        var dashboardIdUsed = [];
        dashboardIdUsed = getIdUsed();
        /*随机生成ID*/
        var dashboardID;
        dashboardID = getID(dashboardGroupId+"_",dashboardIdUsed);
        var series = '<div class="col-md-'+meter.span+' col-sm-12">'+
            '<div class="cas-panel-head">'+meter.title+'<span class="glyphicon glyphicon-cog cas-title-cog">'+
            '<input type="hidden" value="'+dashboardID+'"/></span></div>'+
            '<div class="cas-panel-body">'+
            '<div class="cas-chart-container overflowY" id="'+dashboardID+'"></div></div></div>';
        /*将仪表加入仪表组*/
        $(".selectDBG").parent().children().eq(2).append(series);

        meter.id = dashboardID;
    }
    /*点击添加热力图*/
    $("body").on("click",".DB1",function () {      /*DB1这个元素是动态添加 $(".DB1").live("click",function(){});也行*/
        console.log("这是热力图");
        var meterData = {
            title: "heatmap_cpu",
            id: "",
            span: 6,
            meterType: "heatmap",
            rule:{
                levelArray:[0,400000,800000,1200000,1600000,2000000,9900000],
                colorArray:['white','grey','yellow','blue','green','red']
            }
        };


        /*添加空仪表*/
        addDashboard(meterData);
        /*获取仪表组位置*/
        var allClass = $(".selectDBG").next().attr("class").split(" ");
        var dashboardGroupId = allClass[1];         /*获取仪表组ID*/
        var dashboardGroupIndex = dashboardGroupLcaltion (dashboardGroupId);
        /*获取仪表位置*/
        var dashboardIndex = getDashboardLocation(meterData.id);

        /*默认仪表样式*/
        var meterStyle={
            id:meterData.id,
            meterType:"heatmap",
            styleData: {
                textColor: [],
                textSize: [],
                textWeight: [],
                backgroundColor: 'transparent',
                lineStyle: {
                    color: '',
                    width: '',
                    smooth: '',
                    opacity: '',
                    type: ''
                },
                areaStyle: {
                    opacity: '',
                    color: ''
                },
                otherParams: {
                    pie_radius: [],
                    pie_depth: '',
                    label_show: false
                }
            }
        };


        /*将仪表配置数据发送给服务端*/
        sendDataToSever(meterData,dashboardIndex,dashboardGroupIndex,meterStyle,dashboardGroupId);

    });
    /*点击添加折线图*/
    $("body").on("click",".DB2",function () {
        console.log("这是折线图");
        var meterData = {
            title: "line",
            id: "",
            span: 3,
            meterType: "line",
        };


        /*添加空仪表*/
        addDashboard(meterData);
        /*获取仪表组位置*/
        var allClass = $(".selectDBG").next().attr("class").split(" ");
        var dashboardGroupId = allClass[1];         /*获取仪表组ID*/
        var dashboardGroupIndex =  dashboardGroupLcaltion (dashboardGroupId);
        /*获取仪表位置*/
        var dashboardIndex = getDashboardLocation(meterData.id);

        var meterStyle={
            id:meterData.id,
            meterType:"line",
            styleData: {
                textColor: [, '#333'],
                textSize: [, 12],
                textWeight: [, 'normal'],
                backgroundColor: 'transparent',
                lineStyle: {
                    color: '',
                    width: 1,
                    type: 'solid',
                    opacity: 0.5,
                    smooth: true
                },
                areaStyle: {
                    opacity: 0,
                    color: ''
                },
                otherParams: {
                    pie_radius: [],
                    pie_depth: '',
                    label_show: ''
                }
            }
        };

        /*将仪表配置数据发送给服务端*/
        sendDataToSever(meterData,dashboardIndex,dashboardGroupIndex,meterStyle,dashboardGroupId);

    });
    /*点击添加柱形图*/
    $("body").on("click",".DB3",function () {
        console.log("这是柱形图");
        var meterData = {
            title: "bar",
            id: "",
            span: 12,
            meterType: "bar",
        };


        /*添加空仪表*/
        addDashboard(meterData);
        /*获取仪表组位置*/
        var allClass = $(".selectDBG").next().attr("class").split(" ");
        var dashboardGroupId = allClass[1];         /*获取仪表组ID*/
        var dashboardGroupIndex =  dashboardGroupLcaltion (dashboardGroupId);
        /*获取仪表位置*/
        var dashboardIndex = getDashboardLocation(meterData.id);

        var meterStyle={
            id:meterData.id,
            meterType:"bar",
            styleData: {
                textColor: [, '#333'],
                textWeight: [, 'normal'],
                textSize: [, 12],
                backgroundColor: 'transparent',
                lineStyle: {
                    color: '',
                    width: '',
                    smooth: '',
                    opacity: '',
                    type: ''
                },
                areaStyle: {
                    opacity: 1,
                    color: ''
                },
                otherParams: {
                    pie_radius: [],
                    pie_depth: '',
                    label_show: ''
                }
            }
        };

        /*将仪表配置数据发送给服务端*/
        sendDataToSever(meterData,dashboardIndex,dashboardGroupIndex,meterStyle,dashboardGroupId);

    });
    /*点击添加饼状图*/
    $("body").on("click",".DB4",function () {
        console.log("这是饼状图");
        var meterData = {
            title: "pie",
            id: "",
            span: 6,
            meterType: "pie"
        };


        /*添加空仪表*/
        addDashboard(meterData);
        /*获取仪表组位置*/
        var allClass = $(".selectDBG").next().attr("class").split(" ");
        var dashboardGroupId = allClass[1];         /*获取仪表组ID*/
        var dashboardGroupIndex =  dashboardGroupLcaltion (dashboardGroupId);
        /*获取仪表位置*/
        var dashboardIndex = getDashboardLocation(meterData.id);

        var meterStyle={
            id:meterData.id,
            meterType:"pie",
            styleData: {
                textColor: [, '#333', '#333'],
                textWeight: [, 'normal', 'bold'],
                textSize: [, 12],
                backgroundColor: '',
                lineStyle: {
                    color: '',
                    width: '',
                    smooth: '',
                    opacity: '',
                    type: ''
                },
                areaStyle: {
                    opacity: '',
                    color: ''
                },
                otherParams: {
                    pie_radius: [],
                    pie_depth: '',
                    label_show: ''
                }
            }
        };

        /*将仪表配置数据发送给服务端*/
        sendDataToSever(meterData,dashboardIndex,dashboardGroupIndex,meterStyle,dashboardGroupId);

    });
    /*点击添加雷达图*/
    $("body").on("click",".DB5",function () {
        console.log("这是雷达图");
        var meterData = {
            title: "radar",
            id: "",
            span: 6,
            meterType: "radar"
        };



        /*添加空仪表*/
        addDashboard(meterData);
        /*获取仪表组位置*/
        var allClass = $(".selectDBG").next().attr("class").split(" ");
        var dashboardGroupId = allClass[1];         /*获取仪表组ID*/
        var dashboardGroupIndex =  dashboardGroupLcaltion (dashboardGroupId);
        /*获取仪表位置*/
        var dashboardIndex = getDashboardLocation(meterData.id);

        var meterStyle={
            id:meterData.id,
            meterType:"radar",
            styleData: {
                textColor: [, '#333', '#333'],
                textWeight: [, , 'normal'],
                textSize: [, 12, 12],
                backgroundColor: 'transparent',
                lineStyle: {
                    color: '#000',
                    width: 1,
                    type: 'solid',
                    smooth: '',
                    opacity: ''
                },
                areaStyle: {
                    opacity: 1,
                    color: '#eee'
                },
                otherParams: {
                    pie_radius: [],
                    pie_depth: '',
                    label_show: ''
                }
            }
        };

        /*将仪表配置数据发送给服务端*/
        sendDataToSever(meterData,dashboardIndex,dashboardGroupIndex,meterStyle,dashboardGroupId);

    });
    /*点击添加报警信息*/
    $("body").on("click",".DB11",function () {
        console.log("这是报警信息");
        var meterData = {
            title: "报警信息",
            id: "",
            span: 3,
            meterType: "alert",
            rule:{
                levelArray:[0,400000,800000,1200000,1600000,2000000,9900000],
                colorArray:['white','grey','yellow','blue','green','red']
            }
        };
        /*添加空仪表*/
        addDashboard(meterData);
        /*获取仪表组位置*/
        var allClass = $(".selectDBG").next().attr("class").split(" ");
        var dashboardGroupId = allClass[1];         /*获取仪表组ID*/
        var dashboardGroupIndex =  dashboardGroupLcaltion (dashboardGroupId);
        /*获取仪表位置*/
        var dashboardIndex = getDashboardLocation(meterData.id);
        /*将仪表配置数据发送给服务端*/
        sendDataToSever(meterData,dashboardIndex,dashboardGroupIndex);

    });
    /*点击添加单值图*/
    $("body").on("click",".DB14",function () {
        console.log("这是单值图");
        var dashboardGroupIndex;
        var meterData = {
            title: "cpu_valueSingle",
            id: "",
            span: 3,
            meterType: "unitvalue",
        };



        /*添加空仪表*/
        addDashboard(meterData);
        /*获取仪表组位置*/
        var allClass = $(".selectDBG").next().attr("class").split(" ");
        var dashboardGroupId = allClass[1];         /*获取仪表组ID*/
        dashboardGroupIndex =  dashboardGroupLcaltion (dashboardGroupId);
        /*获取仪表位置*/
        var dashboardIndex = getDashboardLocation(meterData.id);

        var meterStyle={
            id:meterData.id,
            meterType:"unitvalue",
            styleData: {
                textColor: ['#2c343c'],
                textWeight: ['normal'],
                textSize: [40],
                backgroundColor: '',
                lineStyle: {
                    color: '',
                    width: '',
                    smooth: '',
                    opacity: '',
                    type: ''
                },
                areaStyle: {
                    opacity: '',
                    color: '#1E90FF'
                },
                otherParams: {
                    pie_radius: ['80%', '75%'],
                    pie_depth: '',
                    label_show: ''
                }
            }
        };

        /*将仪表配置数据发送给服务端*/
        sendDataToSever(meterData,dashboardIndex,dashboardGroupIndex,meterStyle,dashboardGroupId);

    });
    /*点击添加3D饼状图*/
    $("body").on("click",".DB16",function () {
        console.log("这是3D饼状图");
        var meterData = {
            title: "3Dmemory_value",
            id: "",
            span: 6,
            meterType: "3Dpie"
        };



        /*添加空仪表*/
        addDashboard(meterData);
        /*获取仪表组位置*/
        var allClass = $(".selectDBG").next().attr("class").split(" ");
        var dashboardGroupId = allClass[1];         /*获取仪表组ID*/
        var dashboardGroupIndex =  dashboardGroupLcaltion (dashboardGroupId);
        /*获取仪表位置*/
        var dashboardIndex = getDashboardLocation(meterData.id);

        var meterStyle={
            id:meterData.id,
            meterType:"3Dpie",
            styleData: {
                textColor: [, '#333333', '#fff'],
                textWeight: [, 'bold', 'bold'],
                textSize: [, 12, 11],
                backgroundColor: '',
                lineStyle: {
                    color: '',
                    width: 1,
                    type: 'solid',
                    opacity: 0.5,
                    smooth: true
                },
                areaStyle: {
                    opacity: 0,
                    color: ''
                },
                otherParams: {
                    pie_radius: [],
                    pie_depth: 35,
                    label_show: ''
                }
            }
        };

        /*将仪表配置数据发送给服务端*/
        sendDataToSever(meterData,dashboardIndex,dashboardGroupIndex,meterStyle,dashboardGroupId);

    });
    /*点击添加3D柱状图*/
    $("body").on("click",".DB17",function () {
        console.log("这是3D柱状图");
        var meterData = {
            title: "3Dbar",
            id: "",
            span: 6,
            meterType: "3Dbar",
        };



        /*添加空仪表*/
        addDashboard(meterData);
        /*获取仪表组位置*/
        var allClass = $(".selectDBG").next().attr("class").split(" ");
        var dashboardGroupId = allClass[1];         /*获取仪表组ID*/
        var dashboardGroupIndex =  dashboardGroupLcaltion (dashboardGroupId);
        /*获取仪表位置*/
        var dashboardIndex = getDashboardLocation(meterData.id);

        var meterStyle={
            id:meterData.id,
            meterType:"3Dbar",
            styleData: {
                textColor: [, '#333333'],
                textWeight: [],
                textSize: [, 12],
                backgroundColor: '',
                lineStyle: {
                    color: '',
                    width: '',
                    smooth: '',
                    opacity: '',
                    type: ''
                },
                areaStyle: {
                    opacity: '',
                    color: ''
                },
                otherParams: {
                    pie_radius: [],
                    pie_depth: '',
                    label_show: ''
                }
            }
        };

        /*将仪表配置数据发送给服务端*/
        sendDataToSever(meterData,dashboardIndex,dashboardGroupIndex,meterStyle,dashboardGroupId);

    });

    //删除添加仪表
    $("body").on('click','.removeDB',function(){
        $(this).parent().remove();
    });
}



