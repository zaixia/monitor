/**
 * Created by Lenovo on 2016/11/23.
 */
function makeSingle(divID,single_data){
    var singlevalue = '<div class="cas-chart-container unitvalue-round">'+
                            '<div class="unitvalue-rondLine">'+
                                '<div class="unitvalue-ball"></div>'+
                            '</div>'+
                            '<div class="unitvalue-bg">'+
                                '<p>'+single_data+'</p>'+
                            '</div>'+
                        '</div>';

    $("#"+divID).append(singlevalue);
}