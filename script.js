function formatHHMMSS(num) {
	return num.toString().padStart(2, '0');
}

function formatMS(ms) {
	return ms.toString().padStart(3, '0');
}

function formatFrames(frames) {
	if(frames < 10 & frameRate < 100) {
		return String(frames).padStart(2, '0');
	} else if(frames < 10 & frameRate >= 100 || frames >= 10 & frames < 100 & frameRate >= 100) {
		return String(frames).padStart(3, '0');
	} else {
		return String(frames);
	}
}

function getTime(frame, fps) {
	var time = Math.floor(frame/fps),
	    hours = formatHHMMSS(Math.floor(time/3600)),
	    minutes = formatHHMMSS(Math.floor((time-hours*3600)/60)),
	    seconds = formatHHMMSS(time-(hours*3600+minutes*60)),
	    frames, milliseconds;
	switch(format) {
		case 'frames': { frames = formatFrames(frame%fps); return `${hours}:${minutes}:${seconds}.${frames}`; break; }
		case 'milsec': { milliseconds = formatMS(Math.floor(1000*(frame%fps)/fps)); return `${hours}:${minutes}:${seconds}.${milliseconds}`; break; }
	}
}

function userInputLimiter(fps) {
	var maxValue = Number((359999*fps)+(fps-1)), maxLength = String(maxValue).length;
	$('#numberFrames').attr({'max': maxValue, 'maxlength': Number(maxLength)});
}

function getRandomInteger(min, max) {
	return Math.floor(Math.random()*(max-min))+min;
}

function getRandomArray(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}

function changePlaceHolder() {
	if(format == 'milsec' || format == 'frames' && frameRate >= 100) {
		$('#timecode').prop('placeholder', '00:00:00.000');
	} else {
		$('#timecode').prop('placeholder', '00:00:00.00');
	}
}

function alertViewer(msg, value) {
	var val = value || 0;
	switch(msg) {
		case 'frameRateOverMaxLength': { alert(`No more than three characters are allowed.`);  break; }
		case 'overMaxLength': { alert(`No more than ${val} characters are allowed.`); break; }
		case 'overMaxValue': { alert(`The maximum allowed value should not exceed ${val}.`); break; }
		case 'skipStep': { alert(`You intentionally canceled the action or accidentally pressed the Esc key, so this step will be skipped.`); break; }
		case 'wrongValue': { alert(`It was the reckless decision.`); break; }
	}
}

function checkValid() {
	var maxValue = parseInt($('#numberFrames').attr('max')), maxLength = $('#numberFrames').attr('maxlength');
	if(numberFrames == '' || numberFrames.length == 0 || numberFrames == 0) {
		$('#numberFrames, #timecode').val('');
		$('.clearButton').prop('disabled', true);
	} else if(numberFrames.length > maxLength) {
		numberFrames = numberFrames.slice(0, maxLength);
		$('#numberFrames').val(numberFrames);
		alertViewer('overMaxLength', maxLength);
	} else if(numberFrames > maxValue) {
		$('#timecode').val('');
		alertViewer('overMaxValue', maxValue);
	} else {
		$('#timecode').val(getTime(numberFrames, frameRate));
		$('.clearButton').prop('disabled', false);
	}
}

function addCustomFPS() {
	var optionCount = Number($('#frameRate option').length-1), result = prompt(`Please enter a value that you want:`);
	if(result == null || result == '' || result == undefined) {
		alertViewer('skipStep');
		$('#frameRate').val(frameRate);
	} else if(isNaN(result)) {
		alertViewer('wrongValue');
		$('#frameRate').val(frameRate);
	} else if(String(result).length > 3) {
		alertViewer('frameRateOverMaxLength');
		$('#frameRate').val(frameRate);
	} else {
		if(!$('#frameRate optgroup').attr('class')) {
			$(`#frameRate option:nth-child(${optionCount})`).after($('<optgroup>', { 'class': 'added', 'label': `Added` }));
		}
		$('#frameRate').children('.added').append($('<option>', { 'value': result, 'text': `${result} fps` }));
		$('#frameRate').val(result);
		frameRate = result;
		if(restoreData == 'enabled') { $.Storage.set('currFrameRate', String(result)); }
		userInputLimiter(result);
		changePlaceHolder();
		if(numberFrames > 0) { checkValid(); }
	}
}

function addCustomFPSAuto(fps) {
	if(!$('#frameRate optgroup').attr('class')) {
		$(`#frameRate option:nth-child(7)`).after($('<optgroup>', { 'class': 'added', 'label': 'Added' }));
	}
	$('#frameRate').children('.added').append($('<option>', { 'value': fps, 'text': `${fps} fps` }));
	$('#frameRate').val(fps);
}

function checkRestoreData() {
	if($.Storage.get('restoreData') == 'enabled') {
		$.Storage.set('restoreData', 'disabled');
		restoreData = 'disabled';
	} else {
		$.Storage.set('restoreData', 'enabled');
		restoreData = 'enabled';
	}
}
