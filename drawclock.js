var canvas, context, clock, hands, number;

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
						radius : canvas.height / 2 * 0.25,
						angle : 213,
						color : 'green', 
						extra : false
					},
				minute : {
						radius : canvas.height / 2 * 0.45,
						angle : 330,
						color : 'red',
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

});

/**
 * draws the shapes and the numbers of the clock,
 * needs several properties of the clock object.
 */
function drawClock() {
	colorBackground('#85ADAD');
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
		context.lineWidth = 4;
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
		context.lineWidth = 4;

		for (var i = 0; i < 60; i++) {
			// if (i%5 !== 0) {
				coords = getCoordinates(clock.minuteLineRadius, clock.minuteLineAngle);
				console.log(coords[0], coords[1]);
				context.save();
				context.lineWidth = 1;
				context.moveTo(coords[0], coords[1]);
				context.translate(coords[0], coords[1]);
				context.rotate((clock.minuteLineAngle + 90) * Math.PI/180);
				context.lineTo(0, -10);
				context.stroke();
				context.restore();
			//}
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
	x = Math.floor(clock.centerX + radius * Math.cos(angle * (Math.PI /180))) + 0.5;
	y = Math.floor(clock.centerY + radius * Math.sin(angle * (Math.PI/180))) + 0.5;
	return [x, y];
}