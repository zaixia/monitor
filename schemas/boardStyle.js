/**
 * Created by dan on 2017/3/1.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let lineStyle =new Schema({
    color : String,
    width : Number,
    type: String,
    opacity : Number,
    smooth: Boolean
});

let areaStyle =new Schema({
    color : String,
    opacity: Number
});

let otherParams =new Schema({
    pie_radius:Array,
    pie_depth:Number,
    label_show:Boolean
});

let styleData =new Schema({
    textColor: [String],
    textWeight: [String],
    textSize: [String],
    backgroundColor: String,
    lineStyle: lineStyle,
    areaStyle: areaStyle,
    otherParams:otherParams

});

let meterArray = new Schema({
    id: String,
    meterType: String,
    styleData : styleData
});

let dashboardStyleArray = new Schema({
    rowList: String,
    meters: [meterArray]
});

let dashboardStyle =new Schema({
    dashboardStyleArray : [dashboardStyleArray]
},{collection:'boardStyle'});

exports.dashboardStyle = dashboardStyle;
exports.meters =meterArray;
exports.dashboardStyleArray = dashboardStyleArray;
exports.styleData =styleData;
exports.otherParams=otherParams;
exports.areaStyle=areaStyle;
exports.lineStyle=lineStyle;