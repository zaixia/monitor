/**
 * Created by wubin on 2016/12/15.
 */
import  { startTime,endTime,transToLocalTime } from './dateRange';

/*获取静态数据*/
/*静态数据的key值*/
export function getConstantData() {
    /*获取静态数据*/
    /*静态数据的key值*/
    var constantValue;
    $.ajax({
        url:"/constantValue",
        type:"GET",
        async:false,
        dataType:"json",
        success:function (data) {
            constantValue = data;
        }
    });
    return constantValue;
}
/*生成一个仪表的数据*/
export function queryToData(data,meterType,constantValue) {

    //console.log(data);
    let time = [];        //定义时间数组
    let dataArray = [];   //定义仪表的数据值数组
    let legendArray = [];  //定义legend数组
    let meterOption = {};
    let sum;
    let hostName;
    let heatmapInfoArray = [];
    /*生成一条数据*/
    for (let i = 0; i< data.length; i ++){
        /*根据查询data信息，创建查询语句*/
        var queryString;
        var tagKeysString  = "";
        for (let idx in data[i].queryInfo.tagKeysValue){
            /*判断是否存在变量*/
            if(data[i].queryInfo.tagKeysValue[idx].indexOf("@") == 0){
                /*tagKeysValue静态变量value*/
                var constVar = data[i].queryInfo.tagKeysValue[idx].slice(1);
                /*判断tagKeysValue静态变量是否与constantValue中的key一致*/
                for (let contKey in constantValue){
                    /*如果一致，则将选中的select中的值赋给tagKeysValue的value进行查询*/
                    if(constVar == contKey){
                        let constSingleValue = $("."+contKey+" option:selected").text();
                        if ("host"==contKey){
                            //console.log("host"==contKey);
                            data[i].queryInfo.tagKeysValue[idx] = constSingleValue;
                            hostName = constSingleValue;
                        }else {
                            data[i].queryInfo.tagKeysValue[idx] = constSingleValue;
                        }
                    }
                }
            }else{
                if(idx == "host"){
                    hostName = data[i].queryInfo.tagKeysValue[idx];
                }
            }
            tagKeysString += "+and+%22"+idx+"%22+%3D+'"+data[i].queryInfo.tagKeysValue[idx]+"'"
        };
        switch (meterType){
            case "line": queryString = "http://"+data[i].queryInfo.serverSource+":"+data[i].queryInfo.port+"/query?q=select+value+from+%22"+
                data[i].queryInfo.measurements+"%22+where+1=1"+tagKeysString+"+and+time+%3E%3D+"+
                startTime+"+and+time+%3C%3D+"+endTime+"&db="+data[i].queryInfo.database;
            break;
            case "unitvalue":queryString = "http://"+data[i].queryInfo.serverSource+":"+data[i].queryInfo.port+"/query?q=select+value+from+%22"+
                data[i].queryInfo.measurements+"%22+where+1=1"+tagKeysString+"+order+by+time+desc+limit+1&db="+data[i].queryInfo.database;
            break;
            case "alert":queryString = "http://"+data[i].queryInfo.serverSource+":"+data[i].queryInfo.port+"/query?q=select+value+from+%22"+
                data[i].queryInfo.measurements+"%22+where+1=1"+tagKeysString+"+order+by+time+desc+limit+1&db="+data[i].queryInfo.database;
                break;
            case  "radar":queryString = "http://"+data[i].queryInfo.serverSource+":"+data[i].queryInfo.port+"/query?q=select+value+from+%22"+
                data[i].queryInfo.measurements+"%22+where+1=1"+tagKeysString+"+and+time+%3E%3D+now()+-+50s+and+time+%3C%3D+now()+-+40s%3Bselect+sum(value)+from+%22"+
                data[i].queryInfo.measurements+"%22+where+host+%3D+'"+hostName+"'+and+time+%3E%3D+now()+-+50s+and+time+%3C%3D+now()+-+40s&db="+
                data[i].queryInfo.database;
            break;
            case "pie":queryString = "http://"+data[i].queryInfo.serverSource+":"+data[i].queryInfo.port+"/query?q=select+value+from+%22"+
            data[i].queryInfo.measurements+"%22+where+1=1"+tagKeysString+"+and+time+%3E%3D+now()+-+50s+and+time+%3C%3D+now()+-+40s&db="+data[i].queryInfo.database;
            break;
            case "3Dpie":queryString = "http://"+data[i].queryInfo.serverSource+":"+data[i].queryInfo.port+"/query?q=select+value+from+%22"+
                data[i].queryInfo.measurements+"%22+where+1=1"+tagKeysString+"+and+time+%3E%3D+now()+-+50s+and+time+%3C%3D+now()+-+40s&db="+data[i].queryInfo.database;
                break;
            case "bar":queryString = "http://"+data[i].queryInfo.serverSource+":"+data[i].queryInfo.port+"/query?q=select+value+from+%22"+
                data[i].queryInfo.measurements+"%22+where+1=1"+tagKeysString+"+and+time+%3E%3D+"+
                startTime+"+and+time+%3C%3D+"+endTime+"&db="+data[i].queryInfo.database;
            case "3Dbar":queryString = "http://"+data[i].queryInfo.serverSource+":"+data[i].queryInfo.port+"/query?q=select+value+from+%22"+
                data[i].queryInfo.measurements+"%22+where+1=1"+tagKeysString+
                "+and+time+%3E%3D+"+
                startTime+"+and+time+%3C%3D+"+endTime+"&db="+data[i].queryInfo.database;
            break;
            case "heatmap":queryString = "http://"+data[i].queryInfo.serverSource+":"+data[i].queryInfo.port+"/query?q=select+*+from+%22"+
                data[i].queryInfo.measurements+"%22+where+1=1"+tagKeysString+"+group+by+%22host%22+order+by+time+desc+limit+1&db="+data[i].queryInfo.database;
                break;
        }
        /*end创建查询语句*/
        /*发送查询请求*/
        $.ajax({
            url:queryString,
            type:"GET",
            async:false,
            success:function (Data) {
                if(Data.results[0].series.length >1){

                    for(let i = 0;i<Data.results[0].series.length;i ++){
                        /*热力图解析*/
                        var heatmapInfoObject = {};
                        heatmapInfoObject.hostIP = Data.results[0].series[i].tags.host;
                        heatmapInfoObject.hostName = Data.results[0].series[i].values[0][3];
                        heatmapInfoObject.value = Data.results[0].series[i].values[0][4];
                        heatmapInfoArray.push(heatmapInfoObject);
                        /*end热力图*/
                    }
                }else{
                        var meterData = Data.results[0].series[0];
                        var values = meterData.values;
                        var singledata = [];        //当个数组
                        time.splice(0,time.length);
                        singledata.splice(0,singledata.length);
                        /*处理每个点的数据*/
                        for(var inx in values){
                            time.push(transToLocalTime(values[inx][0].slice(0,19)));
                            singledata.push(values[inx][1]);
                        }
                        dataArray.push(singledata);
                        if(Data.results[1]){
                            sum = Data.results[1].series[0].values[0][1];
                        };
                }
            }
        });
        legendArray.push(data[i].legend);
    }
    meterOption.xAxis = time;
    meterOption.series = dataArray;
    meterOption.legend = legendArray;
    meterOption.sum = sum;
    meterOption.heatmap = heatmapInfoArray;
    return meterOption;
}