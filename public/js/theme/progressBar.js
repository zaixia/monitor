
function makeProgressBar(divID,series_data) {
	/*初始化HTML元素*/
	var progressBar = "";
	for(var i = 0; i<series_data.length; i++){
		progressBar += '<div class="progress">'+
							'<div class="progress-bar progress-bar-info progress-bar-striped active" style="width: '+series_data[i].percent+'%;">'+
								'<i>'+series_data[i].name+'</i>'+
								'<div class="progress-value">'+series_data[i].percent+'%</div>'+
							'</div>'+
						'</div>';
	}
	$("#"+divID).append(progressBar);
}


