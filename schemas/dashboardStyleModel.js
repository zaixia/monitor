/**
 * Created by dan on 2017/3/1.
 */
let meterArray = new Schema({
    id: String,
    meterType: String,
    styleData : {
        textColor: [String],
        textWeight: [String],
        textSize: [Number],
        backgroundColor: String,
        lineStyle : {
            color : String,
            width : Number,
            type: String,
            opacity : Number,
            smooth: Boolean
        },
        areaStyle : {
            color : String,
            opacity: Number
        },
        otherParams :{
            pie_radius:[String],
            pie_depth:Number,
            label_show:Boolean
        }
    }
});

let dashboardStyleArray = new Schema({
    rowList: String,
    meters: [meterArray]
});

let dashboardStyle =new Schema({
    dashboardStyleArray : [dashboardStyleArray]
},{collection:'james'});

exports.meterArray = meterArray;
exports.dashboardStyleArray = dashboardStyleArray;
module.exports = dashboardStyle;
