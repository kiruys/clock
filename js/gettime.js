
$(document).ready(function () {

	var randomTime = {}, balloonCanvas, balloonCxt, feedback = {};

	feedback = {positive: {
							color: 'purple',
							text : 'Goed gedaan!',
							font : '50px Comic Sans MS'
						},
				negative: {
							color: 'blue',
							text : 'Probeer het nog eens',
							font : '30px Comic Sans MS'
						}
			};

	// balloonCanvas = document.getElementById("canvas-balloon");
	// balloonCxt = balloonCanvas.getContext('2d');

	generateTime();

	// if (balloonCanvas.getContext){
	// 	drawBalloon();
		
	// }

	

	$('#new-time').on('click', generateTime);
	$('#check-time').on('click', checkTime);

	function generateTime() {
		randomTime.hour = Math.floor((Math.random()* 12) + 1);
		if (localStorage['level'] === '1') {
			randomTime.minutes = Math.round(Math.random()) * 30;
		}
		if (localStorage['level'] === '2') {
			randomTime.minutes = (Math.floor((Math.random() * 4) + 1) * 15) - 15;
		}
		if (localStorage['level'] === '3') {
			randomTime.minutes = Math.floor((Math.random() * 60) + 1) - 1;
		}

		if (randomTime.minutes === 0) {
			$('#random-time').text(randomTime.hour + ' uur');
			return;
		}
		if (randomTime.minutes === 1) {
			$('#random-time').text(randomTime.hour + ' uur en ' + randomTime.minutes + ' minuut');
			return;
		}
		if (randomTime.minutes > 0) {
			$('#random-time').text(randomTime.hour + ' uur en ' + randomTime.minutes + ' minuten');
			return;
		}	
	}

	function checkTime() {
		var hourAngle, minuteAngle, clockHour, clockMinutes;
		hourAngle = resetAngle(hands.hour.angle);
		minuteAngle = resetAngle(hands.minute.angle);
		clockHour = getHour(hourAngle);
		clockMinutes = Math.round(getMinutes(minuteAngle));
		if (clockMinutes < (randomTime.minutes + 1) & clockMinutes > randomTime.minutes -1) {
			
			alert('Goed zo!');
			generateTime();
			//drawText('positive');
			return;
		}
		alert('Probeer het nog eens');
		//drawText('negative');
		return;
	}

	function drawBalloon() {
		balloonCxt.beginPath();
		balloonCxt.moveTo(60, 100);
		balloonCxt.bezierCurveTo(10, 140, 60, 200, 100, 180);
		balloonCxt.bezierCurveTo(100, 220, 240, 240, 250, 190);
		balloonCxt.bezierCurveTo(260, 210, 360, 230, 360, 140);
		balloonCxt.bezierCurveTo(430, 140, 440, 80, 380, 50);
		balloonCxt.bezierCurveTo(380, 5, 250, 5, 240, 50);
		balloonCxt.bezierCurveTo(220, 5, 120, 5, 120, 50);
		balloonCxt.bezierCurveTo(80, 20, 40, 60, 60, 100);
		// complete custom shape
		//balloonCxt.closePath();
		balloonCxt.lineWidth = 5;
		balloonCxt.strokeStyle = 'red';
		balloonCxt.stroke();
	}

	function drawText(outcome) {
		balloonCxt.clearRect(80, 70, 300, 60);
		balloonCxt.font = feedback[outcome].font;
		balloonCxt.textAlign = "left";
		balloonCxt.textBaseline = "middle";
		balloonCxt.fillStyle = feedback[outcome].color;
		balloonCxt.fillText(feedback[outcome].text, 80, 100);
	}

	function clearText() {
		balloonCxt.clearRect(0, 0, balloonCanvas.width, balloonCanvas.height);
	}
});