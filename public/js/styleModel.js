/**
 * Created by Wubin on 2016/12/6.
 */
/*定义全局变量*/
/*点击颜色按钮，获取颜色的序列号*/
var colorIndex;
/*定义全局option选项*/
var meterOption;

/*line仪表样式修改函数*/
function lineStyleModel(seriesData) {
    /*加载line的样式设置model*/
   $.get("./page/modalEditPanel/modalLine.html",function (data) {
       $(".setUpStyleShow").html(data);
       var lineStyle ="";
       for(var i=0;i<seriesData.length;i++){
           lineStyle += '<div class="form-group colorModelShow">'+
                           '<label>'+seriesData[i].name+'</label>'+
                           '<span class="cas-color lineStyleColor" colorIndex = "'+i+'" style="background: '+seriesData[i].lineStyle.color+'"></span>'+
                        '</div>'
       }
       $(".lineStyle").html(lineStyle);
   });

    /*线条颜色，弹出模态框，获取lineStyleColor*/
    $("body").on("click",".lineStyleColor",function () {
        /*获取点击颜色按钮的index*/
        colorIndex = $(self).attr("colorIndex");
        /*弹出颜色板模态框*/
        $('#colorModal').modal('show');
    })
    /*end线条颜色*/

    /*背景颜色,弹出颜色模态，获取colorIndex*/
     $("body").on("click",".backGroundColor",function () {
     $('#colorModal').modal('show');
     colorIndex = $(this).attr("colorIndex");
     });
    /*end背景颜色*/

    /*全局字体颜色*/
    $("body").on("click",".textStyleColor",function () {
        $('#colorModal').modal('show');
        colorIndex = $(this).attr("colorIndex");
    });
    /*end全局字体颜色*/

    /*区域缩放字体颜色*/
    $("body").on("click",".dataZoomTextColor",function () {
        $('#colorModal').modal('show');
        colorIndex = $(this).attr("colorIndex");
    });
    /*end区域缩放字体颜色*/
    /*点击颜色模态框保存按钮，保存颜色到对应colorIndex*/
   $("body").on("click","#takeColorSave",function () {
       $('#colorModal').modal('hide');
       var getColor = $("input[name='color']").filter(":checked").next().attr("colorAttr");
       $('span[colorIndex="'+colorIndex+'"]').css({"background":getColor});
   })
    /*end点击颜色模态框保存按钮，保存颜色到对应colorIndex*/

    /*点击预览按钮，实现模态框中仪表的重新渲染*/
    $("body").on("click","#setUpPreview",function () {
        /*如果lineOption不为空，则对齐设置进行修改*/
        if(lineOption){
            meterOption = lineOption;
            var seriesLength = meterOption.series.length;
            /*获取线条颜色name和color*/
                var lineStyleArray = new Array();
                /*清空数组*/
                //lineStyleArray.splice(0,lineStyleArray.length);
                $(".colorModelShow").each(function () {
                    /*每次push一个lineStyleObject*/
                    var lineStyleObject = new Object();
                    lineStyleObject.name = $(this).children("label").text();
                    lineStyleObject.color = $(this).children("span").css("background-color");
                    lineStyleArray.push(lineStyleObject);
                });
            for(var j=0;j<seriesLength;j++){
                    meterOption.series[j].name = lineStyleArray[j].name;
                    meterOption.series[j].lineStyle.normal.color = lineStyleArray[j].color;
            }
            /*end 获取线条颜色name和color*/

            /*设置线条宽度*/
            for(var k=0;k<seriesLength;k++){
                meterOption.series[k].lineStyle.normal.width = $("input[name='lineWidth']").val();
            }
            /*end线条宽度*/

            /*设置线条是否平滑曲线*/
            for(var k=0;k<seriesLength;k++){
                if($("#isSmooth option:selected").text() == "是"){
                    meterOption.series[k].smooth = true;
                }else{
                    meterOption.series[k].smooth = false;
                }
            }
            /*end设置线条是否平滑曲线*/

            /*设置线条类型*/
            for(var k=0;k<seriesLength;k++){
                switch($("#lineStyle option:selected").text()){
                    case "实线":
                        meterOption.series[k].lineStyle.normal.type = "solid";
                        break;
                    case "虚线":
                        meterOption.series[k].lineStyle.normal.type = "dashed";
                        break;
                    case "点线":
                        meterOption.series[k].lineStyle.normal.type = "dotted";
                        break;
                }
            }
            /*end设置线条类型*/
            /*线条透明度*/
            for(var k=0;k<seriesLength;k++){
                meterOption.series[k].lineStyle.normal.opacity = $("#lineOpacity option:selected").text();
            }
            /*end线条透明度*/
            /*填充区域透明度*/
            for(var k=0;k<seriesLength;k++){
                meterOption.series[k].areaStyle.normal.opacity = $("#areaOpacity option:selected").text();
            }
            /*end填充区域透明度*/
            /*背景颜色*/
            meterOption.backgroundColor = $('span[colorIndex="3"]').css("background-color");
            /*end背景颜色*/
            /*字体颜色*/
            meterOption.textStyle.color = $('span[colorIndex="4"]').css("background-color");
            /*end字体颜色*/
            /*字体大小*/
            meterOption.textStyle.fontSize = $("#textFontSize option:selected").text();
            /*end字体大小*/
            /*字体粗细*/
            switch($("#textFontWeight option:selected").text()){
                case "正常":
                    meterOption.textStyle.fontWeight = "normal";
                    break;
                case "加粗":
                    meterOption.textStyle.fontWeight = "bold";
                    break;
                case "更粗":
                    meterOption.textStyle.fontWeight = "bolder";
                    break;
                case "更细":
                    meterOption.textStyle.fontWeight = "lighter";
                    break;
            }
            /*end字体粗细*/
            /*图表组件*/
            /*Grid位置*/
            meterOption.grid.left = $("input[name='gridLeft']").val();
            meterOption.grid.right = $("input[name='gridRight']").val();
            meterOption.grid.top = $("input[name='gridTop']").val();
            meterOption.grid.bottom = $("input[name='gridBottom']").val();
            /*end Grid组件*/
            /*工具栏---保存图片*/
            meterOption.toolbox.feature.saveAsImage.show = $("input[name='saveAsImage']").is(":checked");
            /*end工具栏---保存图片*/
            /*工具栏---配置项还原*/
            meterOption.toolbox.feature.restore.show = $("input[name='restore']").is(":checked");
            /*end工具栏---配置项还原*/
            /*工具栏---数据视图*/
            meterOption.toolbox.feature.dataView.show = $("input[name='dataView']").is(":checked");
            /*end--数据视图*/
            /*工具栏---数据区域缩放*/
            meterOption.toolbox.feature.dataZoom.show = $("input[name='dataZoom']").is(":checked");
            /*end工具栏---数据区域缩放*/
            /*工具栏---动态类型切换*/
            var isLineOrBar = $("input[name='lineOrBar']").is(":checked");
            var isStackOrTiled = $("input[name='stackOrTiled']").is(":checked");
            if(isLineOrBar && isStackOrTiled){
                meterOption.toolbox.feature.magicType.type = ["line","bar","stack","tiled"];
                /*console.log("lineOrBar和stackOrTiled都选了");*/
            }else if(isLineOrBar && !isStackOrTiled){
                meterOption.toolbox.feature.magicType.type = ["line","bar"];
                /*console.log("lineOrBar选了，stackOrTiled没选");*/
            }else if(!isLineOrBar && isStackOrTiled){
                meterOption.toolbox.feature.magicType.type = ["stack","tiled"];
                /*console.log("lineOrBar没选，stackOrTiled选了");*/
            }else{
                meterOption.toolbox.feature.magicType.type = [];
                /*console.log("lineOrBar没选，stackOrTiled没选");*/
            }
            /*end工具栏---动态类型切换*/
            /*图例组件*/
            /*图例组件---组件位置*/
            switch($("#legendLocation option:selected").text()){
                case "左对齐":
                    meterOption.legend.left = "left";
                    break;
                case "居中":
                    meterOption.legend.left = "center";
                    break;
                case "右对齐":
                    meterOption.legend.left = "right";
                    break;
            }
            /*end图例组件---组件位置*/
            /*图例组件--布局朝向*/
            switch($("#legendOrient option:selected").text()){
                case "横向排列":
                    meterOption.legend.orient = "horizontal";
                    break;
                case "纵向排列":
                    meterOption.legend.orient = "vertical";
                    break;
            }
            /*end图例组件--布局朝向*/
            /*提示框组件*/
            switch($("#tooltipShow option:selected").text()){
                case "显示":
                    meterOption.tooltip.show = "true";
                    break;
                case "隐藏":
                    meterOption.tooltip.show = "false";
                    break;
            }
            /*end提示框组件*/
            /*区域缩放组件---显示与隐藏*/
            switch($("#dataZoomShow option:selected").text()){
                case "显示":
                    meterOption.dataZoom.show = "true";
                    break;
                case "隐藏":
                    meterOption.dataZoom.show = "false";
                    break;
            }
            /*end区域缩放组件---显示与隐藏*/
            /*区域缩放字体颜色*/
            meterOption.dataZoom.textStyle.color = $('span[colorIndex="5"]').css("background-color");
            /*end区域缩放字体颜色*/
            /*图表标注--点标注*/
            /*标注形状*/
            for(var k=0;k<seriesLength;k++){
                switch($("#lineLabelShape option:selected").text()){
                    case "圆形":
                        meterOption.series[k].markPoint.symbol = "circle";
                        break;
                    case "矩形":
                        meterOption.series[k].markPoint.symbol = "rect";
                        break;
                    case "圆角矩形":
                        meterOption.series[k].markPoint.symbol = "roundRect";
                        break;
                    case "三角形":
                        meterOption.series[k].markPoint.symbol = "triangle";
                        break;
                    case "菱形":
                        meterOption.series[k].markPoint.symbol = "diamond";
                        break;
                    case "别针":
                        meterOption.series[k].markPoint.symbol = "pin";
                        break;
                    case "箭头":
                        meterOption.series[k].markPoint.symbol = "arrow";
                        break;
                }
            }
            /*end标注形状*/
            /*标注大小*/
            for(var k=0;k<seriesLength;k++){
                meterOption.series[k].markPoint.symbolSize = $("input[name='lineLabelSize']").val();
            }
            /*end标注大小*/
            var markPointDataObject = new Object();
            var markPointDataArray = new Array();
            for(var k=0;k<seriesLength;k++){
                markPointDataObject.name = "最大值";
                markPointDataObject.type = "max";
            }
        }
    })

    /*点击保存按钮，实现界面中仪表的重新渲染*/
    $("body").on("click","#setUpsave",function () {
        $('#colorModal').modal('show');
    })

}