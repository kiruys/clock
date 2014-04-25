var canvas, context, clock, hands, number;

$(document).ready(function () {

	canvas = document.getElementById("canvas-clock");
	context = canvas.getContext('2d');

	clock = {	color: 'yellow',
				centerColor: 'black',
				radius: canvas.height / 2 * 0.9,
				centerRadius: canvas.height * 0.05,
				centerX: canvas.width / 2,
				centerY: canvas.height / 2
			};

	hands = {	hour : {
						radius : canvas.height / 2 * 0.40,
						angle : 213,
						color : 'green', 
						extra : false
					},
				minute : {
						radius : canvas.height / 2 * 0.60,
						angle : 330,
						color : 'red',
						oldAngle : 330
					},
				lineWidth : 20,
				image : {
							url : "images/hand.png",
							width : 60,
							height : 90
				},
				on : false,
				direction : undefined,		//true : later, false: earlier
			};

	number = { 	radius : canvas.height / 2 * 0.75,
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
	drawCircle(clock.radius, clock.color);
	drawCircle(clock.centerRadius, clock.centerColor);
	drawNumbers();

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