function getTime(numberFrames, frameRate, displayFormat) {
	var frame = numberFrames || 2073599, fps = frameRate || 24, format = displayFormat || 'frames', time = Math.floor(frame/fps), hours = Math.floor(time/3600),
	minutes = Math.floor((time-hours*3600)/60), seconds = time-(hours*3600+minutes*60), frames = frame%fps, milsecs = Math.floor(1000*(frame%fps)/fps);
	if(frames < 10 && fps < 120 || frames >= 10 && frames < 100 && fps >= 120) { frames = `0${frames}`; } else if(frames < 10 && fps >= 120) { frames = `00${frames}`; }
	if(milsecs < 10) { milsecs = `00${milsecs}`; } else if(milsecs >= 10 && milsecs < 100) { milsecs = `0${milsecs}`; } 
	if(seconds < 10) { seconds = `0${seconds}`; }
	if(minutes < 10) { minutes = `0${minutes}`; }
	if(hours < 10) { hours = `0${hours}`; }
	switch(format) {
		case 'frames': { return `${hours}:${minutes}:${seconds}.${frames}`; break; }
		case 'milsec': { return `${hours}:${minutes}:${seconds}.${milsecs}`; break; }
	}
}

function getRandomInteger(min, max) {
	var minValue = min || 0, maxValue = max || 9;
	return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
}

function getRandomArray(array) {
	var arr = array || [12,34,56,78,90], rand = Math.random()*arr.length | 0;
	return arr[rand];
}

function inputLimiter(max, maxLength) {
	var maxValue = max || 2073599, maxLengthValue = maxLength || 7; 
	$('#numberFrames').attr({'max': maxValue, 'maxlength': maxLengthValue});
}

function changePlaceHolder(ph) {
	switch(ph) {
		case 0: { $('#resultField').prop('placeholder', '00:00:00.00'); break; }
		case 1: { $('#resultField').prop('placeholder', '00:00:00.000'); break; }
	}
}

function getFrameTime(frameRate) {
	var fps = frameRate || 24, ft = 1000/fps, ms = ft.toString().substr(0,4);
	$('#frameTime').val(`${ms} ms`);
}
