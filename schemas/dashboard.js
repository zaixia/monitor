/**
 * Created by Wubin on 2016/12/18.
 */
/*Schema - 模式定义*/
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let dataArray = new Schema({
    legend:String,
    queryInfo:{
        database:String,
        measurements:String,
        serverSource:String,
        port:String,
        queryInfoSeq:String,
        tagKeysValue:{}
    }
});

let meterArray = new Schema({
    title: String,
    id: String,
    span: Number,
    meterType:String,
    rule:{},
    data:[dataArray]
});

let dashboardArray = new Schema({
    groupName:String,
    rowList:String,
    meters:[meterArray]
});

let dashboard = new Schema({
    dashboardArray:[dashboardArray]
},{collection:'dashboardData'});
/*//模型编译并进行实例化
dashboard.statics = {
    //添加fetch方法，取出模型中所有的数据。
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    //查询单条的数据
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}*/
exports.dashboard = dashboard;
exports.dashboardArray = dashboardArray;
exports.meterArray = meterArray;
exports.dataArray = dataArray;