/**
 * Created by wubin on 2016/12/12.
 */
var http = require('http');
var express = require("express");
var ejs = require('ejs');
var bodyParser = require('body-parser');

var app = express();
/*让ejs能够识别后缀为’.html’的文件*/
app.engine('.html', ejs.__express);
/*在调用render函数时能自动为我们加上’.html’后缀*/
app.set('view engine', 'html');
/*设定render页面的根目录，则在该目录下的view目录下*/
app.set('views', './build');
/*静态文件的中间件，把目录‘./public’下的文件路径重定向为‘/’，在前段HTML引入的路径就按照重定向的路径来设置*/
app.use('/', express.static('./build'));
/*添加body-parser来解析Post请求传来的json格式数据*/
app.use(bodyParser.json({limit:'10mb'}));
app.use(bodyParser.urlencoded({  //此项必须在 bodyParser.json 下面,为参数编码
    extended: true}));


/*mongoDB连接*/
let mongoose = require("mongoose");
let db = mongoose.connect("mongodb://DBreadWrite:root123@192.168.1.79:12345/monitorking");
db.connection.on("error", function (error) {  console.log("数据库连接失败：" + error); });
db.connection.on("open", function () {  console.log("------数据库连接成功！------"); });

var str = "深入浅出node.js";
var buf = new Buffer(str,'utf-8');
console.log(buf);

let dashboardSave = require('./schemas/dashboardSave');
//let constantValue = require('./schemas/constantValue');
let dashboardStyle = require('./schemas/dashboardStyle')
/*引入数据模型*/
//import { Board,DashboardArray,MeterArray,DataArray } from "./models/models"
//let dashboardSave = require('./schemas/dashboardSave');

/*引入数据编译后的模型*/
var dashboardInformation = require("./models/models");



app.listen(8099);
console.log('INFO: monitorking已经启动');


/*返回仪表盘dashboard数据*/
app.get('/dashboard',function (req,res) {
    dashboardInformation.Board.findOne(
        {'_id': "58b53b9bf24a3c13fce0eeab"},
        null, function(err, documents) {
            res.send(documents);
        })
});


/*返回仪表盘样式*/
app.get('/dashboardStyle',function (req,res) {
    res.send(dashboardStyle);
});
 /*返回静态数据*/

 /*返回静态数据constantValue*/


 var constantValue =
    {
        // 对象  对象的属性：对象属性的值
        host:["192.168.1.79","192.168.1.80","192.168.1.91"],
        type_instance:["idle","interrupt","nice","softirq","steal","system","user","wait"],
        type:["disk_time","disk_ops","disk_octets"]
    };

//存储constantValue数据到mongoDB数据库
/*app.get('/dashboardSave',function (req,res) {
    dashboardInformation.ConstantValue.create({
        host:[ '192.168.1.79','192.168.1.80','192.168.1.91' ],
        type_instance:[ 'idle','interrupt','nice','softirq','steal','system','user','wait' ],
        type: [ 'disk_time','disk_ops','disk_octets' ]
    },function (err,doc) {
        res.send(doc);
        console.log(doc)
    });
});*/
//end存储constantValue数据到mongoDB数据库

/*从mongoDB获取constantValue数据*/
app.get('/constantValue',function (req,res) {
    res.send(constantValue);
    dashboardInformation.constantValue.findOne(
        {'_id': "58b53b9bf24a3c13fce0eeab"},
        null, function(err, documents) {
            res.send(documents);
        })
});
/*从mongoDB获取constantValue数据*/



//测试用的样式数据
var fakeStyleData=require('./test/fakeStyleData');

/*服务器第一次启动时，将初始的仪表样式数据保存到MongoDB数据库中
let style_Data=handleStyleData();
let testData = new dashboardInformation.DashboardStyle({dashboardStyleArray:style_Data});
testData.save(function (err,data) {
    if(err) console.log(err);
    console.log('INFO： Initial Style Data saved in DB');
    console.log(data);
});

/************************************************/


//存储fakeboardStyleData到MongoDB数据库
app.get('/saveStyleDataTest',function (req,res) {
    let style_Data=handleStyleData();
    let testData = new dashboardInformation.DashboardStyle({dashboardStyleArray:style_Data});

    testData.save(function (err,data) {
         if(err) console.log(err);
         console.log(data);
    });
    res.send(fakeStyleData);
});


//处理前台传来的仪表样式数据，并更新到数据库中
app.post('/updateStyleData',function (req,res) {
    var post_data=req.body;
    var rowList=post_data.rowList;
    var meterId=post_data.id;
    console.log('Updating：'+rowList);
    console.log(meterId);
    var update_data={
        textColor: post_data.textColor,
        textWeight: post_data.textWeight,
        textSize: post_data.textSize,
        backgroundColor : post_data.backgroundColor,
        lineStyle: {
            color : post_data.lineStyle_color,
            width : post_data.lineStyle_width,
            type : post_data.lineStyle_type,
            opacity : post_data.lineStyle_opacity,
            smooth : post_data.lineStyle_smooth

        },
        areaStyle: {
            color: post_data.areaStyle_color,
            opacity : post_data.areaStyle_opacity,

        },
        otherParams: {
            pie_radius: post_data.otherParams_pie_radius,
            pie_depth : post_data.otherParams_pie_depth,
            label_show : post_data.otherParams_label_show,

        }
    };
    console.log(update_data);

    dashboardInformation.DashboardStyle.findOne({},function (err,doc) {
        if(err) console.log(err);

        for(let i=0;i<doc.dashboardStyleArray.length;i++){
            if(doc.dashboardStyleArray[i].rowList==rowList){
                for(let j=0;j<doc.dashboardStyleArray[i].meters.length;j++){
                    if(doc.dashboardStyleArray[i].meters[j].id==meterId){
                        doc.dashboardStyleArray[i].meters[j].styleData=update_data;
                        doc.save(function (err,res) {
                            if(err) console.log('ERROR: save error');
                            console.log('INFO: styleData updated');
                            console.log(res);
                        });
                    }
                }
            }
        }

    });
    res.send('res from server');

})



//MongoDB样式数据处理函数
function handleStyleData() {
    let styleData=[];
    for(let i=0;i<fakeStyleData.length;i++){
        let style_Data={
            rowList:fakeStyleData[i].rowList,
            meters: function(){
                let meters_Data=[];
                for(let j=0;j<fakeStyleData[i].meters.length;j++){
                    let Meter ={
                        id:fakeStyleData[i].meters[j].id,
                        meterType:fakeStyleData[i].meters[j].meterType,
                        styleData:{
                            textColor:fakeStyleData[i].meters[j].styleData.textColor,
                            textWeight:fakeStyleData[i].meters[j].styleData.textWeight,
                            backgroundColor:fakeStyleData[i].meters[j].styleData.backgroundColor,
                            textSize:fakeStyleData[i].meters[j].styleData.textSize,
                            lineStyle:{
                                color : fakeStyleData[i].meters[j].styleData.lineStyle.color,
                                width : fakeStyleData[i].meters[j].styleData.lineStyle.width,
                                type : fakeStyleData[i].meters[j].styleData.lineStyle.type,
                                opacity : fakeStyleData[i].meters[j].styleData.lineStyle.opacity,
                                smooth : fakeStyleData[i].meters[j].styleData.lineStyle.smooth
                            },
                            areaStyle : {
                                color : fakeStyleData[i].meters[j].styleData.areaStyle.color,
                                opacity : fakeStyleData[i].meters[j].styleData.areaStyle.opacity,

                            },
                            otherParams : {
                                pie_radius:fakeStyleData[i].meters[j].styleData.otherParams.pie_radius,
                                pie_depth : fakeStyleData[i].meters[j].styleData.otherParams.pie_depth,
                                label_show : fakeStyleData[i].meters[j].styleData.otherParams.label_show,
                            }
                       }

                    };
                    meters_Data.push(Meter);
                }
               return meters_Data;
            }()

        };
        styleData.push(style_Data);
    }

    return styleData;
}

//获取指定仪表的样式数据
app.get('/getThisMeterStyle',function (req,res) {
    var meterId=req.query.meter_id;
    var rowList=req.query.rowList;
    var meterStyle;
    console.log(meterId);
    console.log(rowList);

    dashboardInformation.DashboardStyle.findOne({},function (err,data) {
        if(err) console.log(err);
        //console.log(data);
        //res.send(data);

        dataArray=data.dashboardStyleArray;
        for(let i=0;i<dataArray.length;i++){
            if(dataArray[i].rowList==rowList){
                for(let j=0;j<dataArray[i].meters.length;j++){
                    if(dataArray[i].meters[j].id==meterId){
                        meterStyle=dataArray[i].meters[j];
                        res.send(meterStyle);
                        console.log(meterStyle);

                    }
                }
            }
        }
    });

})


//获取数据库中保存的样式数据
app.get('/getStyleDataTest',function (req,res) {
  //  var meterStyle;

 /*
    //获取指定仪表的样式数据
    dashboardInformation.DashboardStyle.findOne({},function (err,data) {
         if(err) console.log(err);
         //console.log(data);
         //res.send(data);

         dataArray=data.dashboardStyleArray;
         for(let i=0;i<dataArray.length;i++){
             if(dataArray[i].rowList=='rowList1'){
                  for(let j=0;j<dataArray[i].meters.length;j++){
                      if(dataArray[i].meters[j].id=='uptime_value'){
                           console.log('2222222');
                           meterStyle=dataArray[i].meters[j];
                           res.send(meterStyle);
                           console.log(meterStyle);
                          // return meterStyle;
                      }
                  }
             }
        }
    });
    */
    //获取全部样式数据
    dashboardInformation.DashboardStyle.findOne({},function (err,data) {
        if(err) console.log(err);
        res.send(data);
        console.log(data);
    });


});

//更改指定仪表的样式数据
app.get('/modifyStyleDataTest',function (req,res) {
   var editedStyleData= {
       textColor: ['#2c343c'],
       textWeight: ['bold'],
       textSize: [20],
       //        backgroundColor : '',
       lineStyle: {
           //         color : '',
           //        width : ,
           //       type : '',
           //      opacity : ,
           //     smooth : ,

       },
       areaStyle: {
           color: '#1E90FF'
           //      opacity : ,

       },
       otherParams: {
           pie_radius: ['60%', '45%']
           //        pie_depth : ,
           //       label_show : ,

       }
   };
    dashboardInformation.DashboardStyle.findOne({},function (err,doc) {
        if(err) console.log(err);

        for(let i=0;i<doc.dashboardStyleArray.length;i++){
            if(doc.dashboardStyleArray[i].rowList=='rowList1'){
                for(let j=0;j<doc.dashboardStyleArray[i].meters.length;j++){
                    if(doc.dashboardStyleArray[i].meters[j].id=='uptime_value'){
                        doc.dashboardStyleArray[i].meters[j].styleData=editedStyleData;
                        doc.save(function (err,res) {
                            if(err) console.log('save error');
                            console.log('saved');
                            console.log(res);
                        });
                    }
                }
            }
        }

    });

    res.send('res from server');


});


//在样式数据表中添加新的仪表组
app.get('/boardStyleArrayAdd',function (req,res) {
    var boardStyleArrayObject = req.query.boardStyleArrayObject;
    var dashboardArraySeq =req.query.dashboardArraySeq;

    dashboardInformation.DashboardStyle.findOne({},function (err,doc) {
        if(err) console.log(err);
        console.log(dashboardArraySeq);
        console.log(boardStyleArrayObject);
        doc.dashboardStyleArray.splice(dashboardArraySeq, 1, boardStyleArrayObject);
        doc.save(function(err,doc) {
            if (!err) {
                console.log("add style array success");
            } else {
                console.log("add style array wrong!");
            }
        });



    });

    res.send('res from server');

});
//在样式数据库中删除仪表组
app.get('/boardStyleArrayRemove',function (req,res) {
    var dashboardArraySeq = req.query.dashboardArraySeq;

    dashboardInformation.DashboardStyle.findOne({},function (err,doc) {
        if (!err) {
            doc.dashboardArray.splice(dashboardArraySeq,1);
            doc.save(function(err,doc) {
                if (!err) {
                    console.log(" delete array success!");
                } else {
                    console.log("delet array error!");
                }
            });
        } else {
            console.log("not find the game item!");
        }


    });

    res.send('res from server');

});

//增加仪表样式数据
app.get('/addStyleData',function (req,res) {
    var rowList=req.query.rowList;
    var meterStyle = req.query.meterStyle;


    dashboardInformation.DashboardStyle.findOne({},function (err,doc) {
        if(err) console.log(err);

        for(let i=0;i<doc.dashboardStyleArray.length;i++) {
            //在现有仪表组中添加新的仪表
            if (doc.dashboardStyleArray[i].rowList == rowList) {
                var last_index = doc.dashboardStyleArray[i].meters.length;
                doc.dashboardStyleArray[i].meters.splice(last_index, 0, meterStyle);
                doc.save(function (err, res) {
                    if (err) console.log(err);
                    console.log('INFO: style data saved');
                    console.log(res);
                    res.send(doc.dashboardStyleArray[i].meters);
                });
            }
        }


    });


});


//增加仪表样式数据--test
app.get('/addStyleDataTest',function (req,res) {
     var test_newData={
         id:"new_load_shortterm",
         meterType:"unitvalue",
         styleData: {
             textColor :['#fff'],
             textWeight:['lighter'],
             textSize:[30],
             //        backgroundColor : '',
             lineStyle : {
                 //         color : '',
                 width : 5
                 //       type : '',
                 //      opacity : ,
                 //     smooth : ,

             },
             areaStyle : {
                 color : '#1E90FF'
                 //      opacity : ,

             },
             otherParams : {
                 pie_radius:['65%','45%']
                 //        pie_depth : ,
                 //       label_show : ,
             }

         }
     };
    dashboardInformation.DashboardStyle.findOne({},function (err,doc) {
        if(err) console.log(err);

        for(let i=0;i<doc.dashboardStyleArray.length;i++){
            if(doc.dashboardStyleArray[i].rowList=='rowList1'){
                var last_index=doc.dashboardStyleArray[i].meters.length;
                doc.dashboardStyleArray[i].meters.splice(last_index,0,test_newData);
                doc.save(function (err,res) {
                   if(err) console.log(err);
                    console.log('saved');
                    console.log(res);
                    res.send(doc.dashboardStyleArray[i].meters);
                });
            }
        }

    });


});

//删除指定仪表的样式数据
app.get('/deleteStyleDataTest',function (req,res) {
     var rowList='rowList1';
     var meter_id='uptime_value';
    dashboardInformation.DashboardStyle.findOne({},function (err,doc) {
        if(err) console.log(err);
        for(let i=0;i<doc.dashboardStyleArray.length;i++){
            if(doc.dashboardStyleArray[i].rowList==rowList){

                for(let j=0;j<doc.dashboardStyleArray[i].meters.length;j++){

                    if(doc.dashboardStyleArray[i].meters[j].id==meter_id){

                        doc.dashboardStyleArray[i].meters.splice(j,1);
                        doc.save(function (err,res) {
                            if(err) console.log('error while deleting');
                            console.log('meters deleted');
                            console.log(res);

                        })
                    }
                }
            }
        }

    });

    res.send('res from server');

});



app.get('/monitorKing',function (req,res) {
    res.render('initHtml')
});
/*mongoDB数据存储dashboard函数*/
function initDashBoard() {
    let Boardking = [];
    for (let i = 0; i<dashboard.length; i++){
        let Board = {
            groupName:dashboard[i].groupName,
            rowList:dashboard[i].rowList,
            meters:function () {
                let instMeterArray = [];
                for (let j=0; j< dashboard[i].meters.length; j++){
                    let Meter = {
                        title : dashboard[i].meters[j].title,
                        id : dashboard[i].meters[j].id,
                        span : dashboard[i].meters[j].span,
                        meterType:dashboard[i].meters[j].meterType,
                        rule:dashboard[i].meters[j].rule,
                        data:function () {
                            let instDataArray = [];
                            for (var k=0; k< dashboard[i].meters[j].data.length; k++){
                                var Data = {
                                    legend : dashboard[i].meters[j].data[k].legend,
                                    queryInfo : {
                                        queryInfoSeq:dashboard[i].meters[j].data[k].queryInfo.queryInfoSeq,
                                        database:dashboard[i].meters[j].data[k].queryInfo.database,
                                        measurements:dashboard[i].meters[j].data[k].queryInfo.measurements,
                                        serverSource:dashboard[i].meters[j].data[k].queryInfo.serverSource,
                                        port:dashboard[i].meters[j].data[k].queryInfo.port,
                                        tagKeysValue:dashboard[i].meters[j].data[k].queryInfo.tagKeysValue
                                    }
                                };
                                instDataArray.push(Data);
                            }
                            return instDataArray;
                        }()
                    };
                    instMeterArray.push(Meter);
                }
                return instMeterArray;
            }()
        };
        Boardking.push(Board)
    }
    return Boardking;
};

//initDashoBoard();
app.get('/dashboardSaveTest',function (req,res) {
    /*将dashboardData存入mongoDB*/
/*let  DashoBoard = initDashBoard();
let dashboardMon = new boardArray({
     dashboardArray:DashoBoard
 });*/
    /*存储数据*/
    /*dashboardMon.save(function (err) {
        if(err){
            console.log(err)
        }
    });*/
    /*var king = boardArray.find({
        _id:"58ad829bfa376921e8fe0568"
    });
    console.log(king);*/
    res.render('initHtml')
});
app.get('/deploy',function (req,res) {
    res.render('deploy')
});
/*保存dashboardData*/
/*app.get('/dashboardSave',function (req,res) {
    dashboardInformation.Board.create(
        {dashboardArray:initDashBoard()},
        function (err,doc) {
        res.send(doc);
    });
});*/
/*end保存仪表盘*/
/*数据库查询与修改函数*/
function findAndModify(groupName, title, legend, modifyLegend) {
    dashboardInformation.Board.findOne(
        {'dashboardArray.groupName': groupName},
        null, function(err, documents) {

        if (!err) {
            if (documents != null) {
                /*该路径是针对documents的路径*/
                dashboardInformation.Board.findOne({
                    'dashboardArray.groupName': groupName,
                    'dashboardArray.meters.title':title,
                    'dashboardArray.meters.data.legend':legend
                }, null, function(err, subDoc) {
                    if (!err) {
                        console.log("11111111");
                        if (subDoc == null) {
                            console.log("22222222");
                        } else {
                            console.log("88888888888");
                            documents.dashboardArray[1].meters[0].data[0].set('legend',"wubinKing");
                            documents.save(function(err,doc) {
                                if (!err) {
                                    console.log("save documents ok!");
                                } else {
                                    console.log("documents error on save!");
                                }
                            });
                        }
                    }
                });
            }
        } else {
            console.log("not find the game item!");
        }
    }
);
}
/*添加仪表盘函数*/
function dashboardAddFun(dashboardArraySeq, metersSeq, meterObject) {
    dashboardInformation.Board.findOne(
        {'_id': "58b53b9bf24a3c13fce0eeab"},
        null, function(err, documents) {
            if (!err) {
                    documents.dashboardArray[dashboardArraySeq].meters.splice(metersSeq,1,meterObject);
                documents.save(function(err,doc) {
                    if (!err) {
                        console.log("save documents ok!");
                    } else {
                        console.log("documents error on save!");
                    }
                });
            } else {
                console.log("not find the game item!");
            }
        }
    );
}
/*end添加仪表盘函数*/

/*删除仪表组函数*/
function dashboardArrayRemoveFun(dashboardArraySeq) {
    dashboardInformation.Board.findOne(
        {'_id': "58b53b9bf24a3c13fce0eeab"},
        null, function(err, documents) {
            if (!err) {
                documents.dashboardArray.splice(dashboardArraySeq,1);
                documents.save(function(err,doc) {
                    if (!err) {
                        console.log("save documents ok!");
                    } else {
                        console.log("documents error on save!");
                    }
                });
            } else {
                console.log("not find the game item!");
            }
        }
    );
}
/*end删除仪表组函数*/

/*添加仪表组*/
function dashboardArrayAddFun(dashboardArraySeq,dashboardArrayObject) {
    dashboardInformation.Board.findOne(
        {'_id': "58b53b9bf24a3c13fce0eeab"},
        null, function(err, documents) {
            if (!err) {
                documents.dashboardArray.splice(dashboardArraySeq,0,dashboardArrayObject);
                documents.save(function(err,doc) {
                    if (!err) {
                        console.log("save documents ok!");
                    } else {
                        console.log("documents error on save!");
                    }
                });
            } else {
                console.log("not find the game item!");
            }
        }
    );
}
/*end添加仪表组*/

/*获取数据，返回结果*/

/*end获取数据*/

/*app.get('/dashboardFind',function (req,res) {
    /!*boardArray.create(
        {dashboardArray:initDashBoard()},
        function (err,doc) {
            res.send(doc);
        });*!/
    /!*获取前段请求传输的数据*!/
    let groupName = req.query.groupName;
    let title = req.query.title;
    let legend = req.query.legend;
    let modifyLegend = req.query.modifyLegend;
    findAndModify(groupName, title, legend, modifyLegend);
    /!*var query = BoardArray.count({});
    query.in('dashboardArray.meters.title','uptime_value');
    query.exec(function (err,doc) {
        res.send(JSON.stringify(doc));
    })*!/
});*/

/*添加仪表盘接口*/
app.get('/dashboardFind',function (req,res) {
    /*获取前段请求传输的数据*/
    let dashboardArraySeq = req.query.dashboardArraySeq;
    let metersSeq = req.query.metersSeq;
    let meterObject = req.query.meterObject;
    dashboardAddFun(dashboardArraySeq, metersSeq, meterObject);
    //res.send("ok啦啦啦")
    res.send('res from server');
});
/*end添加仪表盘接口*/

/*删除仪表组*/
app.get('/dashboardArrayRemove',function (req,res) {
    /*获取前段请求传输的数据*/
    let dashboardArraySeq = req.query.dashboardArraySeq;
    dashboardArrayRemoveFun(dashboardArraySeq);
    //res.send("ok啦啦啦")
    res.send('res from server');
});
/*end删除仪表组*/

/*添加仪表组*/
app.get('/dashboardArrayAdd',function (req,res) {
    /*获取前段请求传输的数据*/
    let dashboardArraySeq = req.query.dashboardArraySeq;
    let dashboardArrayObject = req.query.dashboardArrayObject;
    dashboardArrayAddFun(dashboardArraySeq,dashboardArrayObject);
    //res.send("ok啦啦啦")
    res.send('res from server');
});
/*end添加仪表组*/

