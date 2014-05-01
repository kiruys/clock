var canvas, context, clock, hands, number, level;

//localStorage.clear();

$(document).ready(function () {

	

	canvas = document.getElementById("canvas-clock");
	context = canvas.getContext('2d');

	clock = {	color: 'yellow',
				centerColor: 'black',
				radius: canvas.height / 2 * 0.9,
				centerRadius: canvas.height * 0.03,
				centerX: canvas.width / 2,
				centerY: canvas.height / 2,
				minuteLineRadius : canvas.height / 2 * 0.65,
				minuteLineAngle : 0
			};

	hands = {	hour : {
						radius : canvas.height / 2 * 0.23,
						angle : 213,
						color : 'green', 
						extra : false
					},
				minute : {
						radius : canvas.height / 2 * 0.43,
						angle : 330,
						color : '#E60000',
						oldAngle : 330
					},
				lineWidth : 18,
				image : {
							url : "images/hand.png",
							width : 60,
							height : 90
				},
				on : false,
				direction : undefined,		//true : later, false: earlier
			};

	number = { 	radius : canvas.height / 2 * 0.78,
				angle : 300,
				fontType : "bold 30px sans-serif"
			};
	
	if (canvas.getContext){
		drawClock();
	}

	$('button.color-choice').on('click', changeColor);

	function changeColor(evt) {
		var $clockPart, partName;
		$clockPart = $(evt.target).closest('div[data-color]');
		partName = $clockPart.data('color');
		if (partName === 'clock') {
			clock.color = $(evt.target).css('background-color');
		}
		if (partName === 'hands.minute') {
			hands.minute.color = $(evt.target).css('background-color');
		}
		if (partName === 'hands.hour') {
			hands.hour.color = $(evt.target).css('background-color');
		}
		drawClock();
		setHands();
	}

});

/**
 * draws the shapes and the numbers of the clock,
 * needs several properties of the clock object.
 */
function drawClock() {
	//colorBackground('#85ADAD');
	drawCircle(clock.radius, clock.color);
	drawCircle(clock.centerRadius, clock.centerColor);
	drawNumbers();
	drawMinuteLines();

	function colorBackground(color) {
		context.beginPath();
		context.rect(0,0, canvas.width, canvas.height);
		context.fillStyle = color;
		context.fill();
	}

	function drawCircle(radius, color) {
		context.beginPath();
		context.arc(clock.centerX, clock.centerY, radius, 0, 2 * Math.PI, true);
		context.fillStyle = color;
		context.fill();
		context.lineWidth = 3;
		context.strokeStyle = '#003300';
		context.stroke();
	}

	function drawNumbers() {
		var iString, coordinates;

		context.font = number.fontType;
		context.textAlign = "center";
		context.textBaseline = "middle";

		for (var i = 1; i <= 12; i++) {
			iString = i.toString();
			coordinates = getCoordinates(number.radius, number.angle);
			context.fillText(iString, coordinates[0], coordinates[1]);
			number.angle += 30;
		}
	}

	function drawMinuteLines() {
		var coords;

		for (var i = 0; i < 60; i++) {
			coords = getCoordinates(clock.minuteLineRadius, clock.minuteLineAngle);
			
			context.save();
			context.beginPath();
			context.lineWidth = 3;
			context.moveTo(coords[0], coords[1]);
			context.translate(coords[0], coords[1]);
			context.rotate((clock.minuteLineAngle + 90) * Math.PI/180);
			
			if (i%5 !== 0) {
				context.lineTo(0, -10);
			}
			if (i%5 === 0) {
				context.lineTo(0, -15);
			}
			context.closePath();
			context.stroke();
			context.restore();

			clock.minuteLineAngle += 6;
		}
	}
}

/**
 * gets the x and y coordinates of a point based on radius and angle,
 * with clock center as a startingpoint.
 */
function getCoordinates(radius, angle) {
	var x, y;
	x = clock.centerX + radius * Math.cos(angle * (Math.PI /180));
	y = clock.centerY + radius * Math.sin(angle * (Math.PI/180));
	return [x, y];
}