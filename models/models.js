/**
 * Created by wubin on 2016/12/18.
 */
//模型，加载mongoose模块
const mongoose = require('mongoose');
//引入模式文件，调用dashboard
let DASHboard = require('../schemas/dashboard');
//引入模式文件，调用constantValue
let constantValue = require('../schemas/constantValue');
//编译生成模型：参数：模型、模式
let dashboardStyle = require('../schemas/boardStyle');
//编译生成模型：参数：模型、模式

//dashboard模式模型的编译
/*最1层*/
let Board = mongoose.model('board', DASHboard.dashboard);
/*最2层*/
let DashboardArray = mongoose.model('dashboardArray', DASHboard.dashboardArray);
/*最3层*/
let MeterArray = mongoose.model('meterArray', DASHboard.meterArray);
/*最4层*/
let DataArray = mongoose.model('dataArray', DASHboard.dataArray);

//constantVlaue模式的模型的编译
let ConstantValue = mongoose.model('constantValue', constantValue.constantValue);
//boardStyle模式模型的编译
let Meters = mongoose.model('meterArray', dashboardStyle.meterArray);
let DashboardStyleArray = mongoose.model('dashboardStyleArray', dashboardStyle.dashboardStyleArray);
let DashboardStyle = mongoose.model('dashboardStyle', dashboardStyle.dashboardStyle);




//导出
exports.Board = Board;
exports.DashboardArray = DashboardArray;
exports.MeterArray = MeterArray;
exports.DataArray = DataArray;
exports.ConstantValue = ConstantValue;
exports.DashboardStyle = DashboardStyle;
exports.DashboardStyleArray = DashboardStyleArray;
exports.Meters=Meters;