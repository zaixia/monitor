/**
 * Created by Lenovo on 2016/11/21.
 */
function makeText(divID,text_data){
    var textData = "<textarea class='cas-textarea overflowY'>"+text_data+"</textarea>";
    $("#"+divID).append(textData);
}