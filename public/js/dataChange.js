/**
 * Created by wubin on 2016/12/22.
 */
import { queryToData } from './queryToData';
import { makeMeter } from './makeMeter';


//获取全局变量g_url_data
import { g_url_data } from './global_value';
var url = g_url_data;

export function dataChange(constantValue) {
    for (let contKey in constantValue){
        $("."+contKey+"").change(function () {
            console.log(url);
            $.ajax({
                url: url,
                type:"GET",
                dataType:"json",
                success:function (dashboard) {
                    for(let j = 0 ;j<dashboard.length;j ++){
                        /*监测需要进行跟新的再实现重新渲染，如果不需要重新渲染的就不进行重新渲染*/
                        for (let i = 0;i<dashboard[j].meters.length;i++ ){
                            let data = dashboard[j].meters[i].data;
                            let meterType = dashboard[j].meters[i].meterType;
                            let Id = dashboard[j].meters[i].id;
                            var meterInfo = queryToData(data,meterType,constantValue);
                            var title = dashboard[j].meters[i].title;
                            makeMeter(Id,meterType,meterInfo,title,dashboard[j].meters[i].rule);
                        }
                    }
                }
            })
        })
    }
}

