/**
 * Created by dan on 2017/2/27.
 */



function fetchValue(page) {

    //定义保存用户自定义样式参数的对象
    var styleData={
        textColor : [],
        textSize : [],
        textWeight : [],
        backgroundColor : '',
        lineStyle : {
            color : '',
            width : '',
            smooth : '',
            opacity : '',
            type : ''
        },
        areaStyle : {
            opacity : '',
            color : ''
        },
        otherParams : {
            pie_radius:[],
            pie_depth:'',
            label_show: ''
        }
    };

    switch(page){
        case "./moduleLine.html":
            styleData.textColor =[,$("#legendColor").val()];
            styleData.textSize= [,$('#legendSize').val()];
            styleData.textWeight= [,$('#textWidth').val()];

            if($("#backgroundColor").val() === '#0000ffff') {
                styleData.backgroundColor='transparent';
            }else{
                styleData.backgroundColor=$("#backgroundColor").val();
            }

            styleData.lineStyle.width=$('#lineWidth').val();
            styleData.lineStyle.smooth=$('#isSmooth').val();
            styleData.lineStyle.opacity=$('#lineOpacity').val();
            styleData.lineStyle.type=$('#lineStyle').val();
            styleData.areaStyle.opacity=$('#areaOpacity').val();

            break;
        case "./moduleBar.html" :
            styleData.textColor =[,$("#legendColor").val()];
            styleData.textSize= [,$('#legendSize').val()];
            styleData.textWeight= [,$('#textWidth').val()];
            styleData.areaStyle.opacity=$('#areaOpacity').val();

            if($("#backgroundColor").val() === '#0000ffff') {
                styleData.backgroundColor='transparent';
            }else{
                styleData.backgroundColor=$("#backgroundColor").val();
            }
            break;
        case "./modulePie.html" :
            styleData.textColor =[,$("#legendColor").val()];
            styleData.textSize= [,$('#legendSize').val(),$('#labelSize').val()];
            styleData.textWeight= [,$('#textWidth').val(),$('#labelWidth').val()];

            break;
        case "./moduleUnitValue.html":
            styleData.textColor = [$("#titleColor").val()];
            styleData.textSize =[$('#titleSize').val()];
            styleData.textWeight=[$('#titleWeight').val()];
            styleData.otherParams.pie_radius=[$('#in_R').val(),$('#out_R').val()];
            styleData.areaStyle.color=$("#areaColor").val();
            break;

        case "./moduleRadar.html":
            styleData.textColor =[,$("#legendColor").val(),$("#nameColor").val()];
            styleData.textSize= [,$('#legendSize').val(),$('#nameSize').val()];
            styleData.textWeight= [,,$('#nameWidth').val()];
            styleData.lineStyle.color=$("#lineColor").val();
            styleData.lineStyle.width=$('#lineWidth').val();
            styleData.lineStyle.type=$('#lineStyle').val();
            styleData.areaStyle.color=$("#areaColor").val();
            styleData.areaStyle.opacity=$('#areaOpacity').val();

            if($("#backgroundColor").val() === '#0000ffff') {
                styleData.backgroundColor='transparent';
            }else{
                styleData.backgroundColor=$("#backgroundColor").val();
            }

            break;
        case "./moduleHeatMap.html":
            if($("#backgroundColor").val() === '#0000ffff') {
                styleData.backgroundColor='transparent';
            }else{
                styleData.backgroundColor=$("#backgroundColor").val();
            }
            let isShow =$('#showLabel').val()==='true'?true:false;
            styleData.otherParams.label_show=isShow;

            break;
        case "./module3DPie.html":
            styleData.textColor =[,$("#legendColor").val(),$("#labelColor").val()];
            styleData.textSize= [,$('#legendSize').val(),$('#labelSize').val()];
            styleData.textWeight= [,$('#legendWidth').val(),$('#labelWidth').val()];
            styleData.otherParams.pie_depth=$('#pieDepth').val();
            break;
        case "./module3DBar.html":
            styleData.textColor =[,$("#legendColor").val()];
            styleData.textSize= [,$('#legendSize').val()];
            break;

        default:


    }

    return styleData;

}

//将用户自定义的样式数据通过ajax请求发送给后台，更新到后台数据库中
function updateStyleData(rowList,meterId,styleData) {
    $.ajax({
            type: 'POST',
            url: '/updateStyleData',
            data: {
                rowList : rowList,
                id : meterId,
                textColor : styleData.textColor,
                textWeight : styleData.textWeight,
                textSize : styleData.textSize,
                backgroundColor : styleData.backgroundColor,
                lineStyle_color : styleData.lineStyle.color,
                lineStyle_width : styleData.lineStyle.width,
                lineStyle_type : styleData.lineStyle.type,
                lineStyle_opacity : styleData.lineStyle.opacity,
                lineStyle_smooth : styleData.lineStyle.smooth,
                areaStyle_color : styleData.areaStyle.color,
                areaStyle_opacity : styleData.areaStyle.opacity,
                otherParams_pie_radius : styleData.otherParams.pie_radius,
                otherParams_pie_depth : styleData.otherParams.pie_depth,
                otherParams_label_show : styleData.otherParams.label_show
            },
            dataType : 'json',
            traditional : true,
            success : function(data) {
                console.log('styleData saved');
                console.log(data);
            },
            error : function(err){
                console.log('error while sending data');
                console.log(err);
            }
        }
    )

}


export { updateStyleData , fetchValue};