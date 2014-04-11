$(document).ready(function () {
	drawClock();

	function drawClock() {
		var canvas, context, clock, hands;	
		canvas = document.getElementById("canvas_clock");
		context = canvas.getContext('2d');

		clock = {	color: 'yellow',
					centerColor: 'black',
					radius: canvas.height / 2 * 0.8,
					centerRadius: canvas.height * 0.01,
					centerX: canvas.width / 2,
					centerY: canvas.height / 2
					};
		hands = {	hourRadius : canvas.height / 2 * 0.3,
					minuteRadius: canvas.height / 2 * 0.5,
					hourColor : 'green',
					minuteColor : 'red',
				};

		if (canvas.getContext){
			drawCircle(clock.radius, clock.color);
			drawCircle(clock.centerRadius, clock.centerColor);
			drawNumbers();
			drawHand(hands.hourRadius, hands.hourColor, 300);
			drawHand(hands.minuteRadius, hands.minuteColor, 180);
		}

		function drawCircle(radius, color) {
			context.beginPath();
			context.arc(clock.centerX, clock.centerY, radius, 0, 2 * Math.PI, false);
			context.fillStyle = color;
			context.fill();
			context.lineWidth = 6;
			context.strokeStyle = '#003300';
			context.stroke();
		}

		function drawNumbers() {
			var number, iString, x, y, coordinates;
			number = { 	radius: canvas.height / 2 * 0.65,
						angle: 300
					};
			context.font = "bold 50px sans-serif";
			context.textAlign = "center";
			context.textBaseline = "middle";

			for (var i = 1; i <= 12; i++) {
				iString = i.toString();
				coordinates = getCoordinates(number.radius, number.angle);
				context.fillText(iString, coordinates[0], coordinates[1]);
				number.angle += 30;
			}
		}

		function drawHand(radius, color, angle) {
			var coordinates = getCoordinates(radius, angle);
			
			context.beginPath();
			context.moveTo(clock.centerX, clock.centerY);
			context.lineTo(coordinates[0], coordinates[1]);
			context.strokeStyle = color;
			context.stroke();
		}

		function getCoordinates(radius, angle) {
			var x, y;
			x = clock.centerX + radius * Math.cos(angle * (Math.PI /180));
			y = clock.centerY + radius * Math.sin(angle * (Math.PI/180));
			return [x, y];
		}
	}





});