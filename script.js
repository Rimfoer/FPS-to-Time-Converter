function formatHHMMSS(num) {
	return num.toString().padStart(2, '0');
}

function formatMilsecs(ms) {
	return ms.toString().padStart(3, '0');
}

function formatFrames(frames, frameRate) {
	if(frames < 10 & frameRate < 120) {
		return frames.toString().padStart(2, '0');
	} else if(frames < 10 & frameRate >= 120 || frames >= 10 & frames < 100 & frameRate >= 120) {
		return frames.toString().padStart(3, '0');
	} else {
		return frames;
	}
}

function getTime(frame, fps, format) {
	var time = Math.floor(frame/fps),
	    hours = formatHHMMSS(Math.floor(time/3600)),
	    minutes = formatHHMMSS(Math.floor((time-hours*3600)/60)),
	    seconds = formatHHMMSS(time-(hours*3600+minutes*60)),
	    frames = formatFrames(frame%fps, fps),
	    milsecs = formatMilsecs(Math.floor(1000*(frame%fps)/fps));
	switch(format) {
		case 'frames': { return `${hours}:${minutes}:${seconds}.${frames}`; break; }
		case 'milsec': { return `${hours}:${minutes}:${seconds}.${milsecs}`; break; }
	}
}

function getRandomInteger(min, max) {
	return Math.floor(Math.random()*(max-min))+min;
}

function getRandomArray(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}

function inputLimiter(max, maxL) {
	$('#numberFrames').attr({'max': max, 'maxlength': maxL});
}

function changePlaceHolder(ph) {
	switch(ph) {
		case 'std': { $('#timecode').prop('placeholder', '00:00:00.00'); break; }
		case 'ext': { $('#timecode').prop('placeholder', '00:00:00.000'); break; }
	}
}

function getFrameTime(frameRate) {
	var fps = frameRate || 24,
	    ft = 1000/fps, ms = ft.toString().substr(0,4);
	$('#frameTime').val(`${ms} ms`);
}
