/**
 * Created by Wubin on 2016/12/18.
 */
/*Schema - 模式定义*/
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let constantValue = new Schema({
    host:Array,
    type_instance:Array,
    type:Array
},{collection:'constantValue'});


exports.constantValue = constantValue;