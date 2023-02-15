function timeConv(val, val2) { // function that converts frames into human-readable time
	var time = Math.floor(val/val2), hours = Math.floor(time/3600), minutes = Math.floor((time-hours*3600)/60), seconds = time-(hours*3600+minutes*60), frames = val%val2;
	if(hours <= 9) { hours = '0' + hours; }
	if(minutes <= 9) { minutes = '0' + minutes; }
	if(seconds <= 9) { seconds = '0' + seconds; }
	if(frames <= 9 && val2 < 120) { frames = '0' + frames; }
	if(frames <= 9 && val2 >= 120) {
		frames = '00' + frames;
	} else if(frames >= 10 && frames <= 99 && val2 >= 120) {
		frames = '0' + frames;
	}
	return hours + ':' + minutes + ':' + seconds + '.' + frames;
}

function getRandomInteger(min, max) { // random integer generator
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArray(arr) { // generator of a random value obtained from an array
	var rand = Math.random()*arr.length | 0;
	return arr[rand];
}

$('#totalFrames').on('input', function() { // when the user enters a value in the input field, it is processed in real time by calling the timeConv() function
	var val = $(this).val(), val2 = $('#frameRate').val();
	if(val2 >= 100 && val >= 10000000) {
		$('#totalFrames').css('width', '83px');
	} else {
		$('#totalFrames').removeAttr('style');
	}
	$('#resultField').val(timeConv(val, val2));
});

function inputLimiter(val) {
	$('#totalFrames').attr('max', val);
}

$('#frameRate').on('click', function() {
	if($(this).val() == 24) {
		inputLimiter(2073599);
	} else if($(this).val() == 25) {
		inputLimiter(2159999);
	} else if($(this).val() == 30) {
		inputLimiter(2591999);
	} else if($(this).val() == 50) {
		inputLimiter(4319999);
	} else if($(this).val() == 60) {
		inputLimiter(5183999);
	} else if($(this).val() == 120) {
		inputLimiter(10367999);
	} else if($(this).val() == 240) {
		inputLimiter(20735999);
	}

	if($(this).val() >= 100) {
		$('#resultField').prop('placeholder', '00:00:00.000');
		$('#resultField').css('width', '85px');
	} else {
		$('#resultField').prop('placeholder', '00:00:00.00');
		$('#resultField').removeAttr('style');
	}
	$('#resultField').val(timeConv($('#totalFrames').val(), $(this).val()));
});

$('.clearButton').click(function() { // no comments
	$('#totalFrames, #frameRate, #resultField').val('');
	$('#frameRate').val('24');
	inputLimiter(2073599);
});

$('.exampleButton').click(function() { // no comments (x2)
	var arr = [24, 25, 30, 50, 60, 120, 240], fps, fr = getRandomArray(arr);
	if(fr == 24) {
		fps = getRandomInteger(1, 2073599);
	} else if(fr == 25) {
		fps = getRandomInteger(1, 2159999);
	} else if(fr == 30) {
		fps = getRandomInteger(1, 2591999);
	} else if(fr == 50) {
		fps = getRandomInteger(1, 4319999);
	} else if(fr == 60) {
		fps = getRandomInteger(1, 5183999);
	} else if(fr == 120) {
		fps = getRandomInteger(1, 10367999);
	} else if(fr == 240) {
		fps = getRandomInteger(1, 20735999);
	}

	if(fr >= 120) {
		$('#resultField').css('width', '85px');
		if(fps >= 10000000) {
			$('#totalFrames').css('width', '83px');
		} else {
			$('#totalFrames').removeAttr('style');
		}
	} else {
		$('#totalFrames, #resultField').removeAttr('style');
	}

	$('#totalFrames').val(fps);
	$('#frameRate').val(fr);
	$('#resultField').val(timeConv(fps, fr));
});