$(document).ready(function () {

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

	hands = {	hour : {
						radius : canvas.height / 2 * 0.15,
						angle : 180,
						color : 'green'
						},
				minute : {
						radius : canvas.height / 2 * 0.25,
						angle : 270,
						color : 'red'
				}
			};

	if (canvas.getContext){
		drawCircle(clock.radius, clock.color);
		drawCircle(clock.centerRadius, clock.centerColor);
		drawNumbers();
		drawHand(hands.hour.radius, hands.hour.color, hands.hour.angle);
		drawHand(hands.minute.radius, hands.minute.color, hands.minute.angle);
	}

	$('select#hours').on('change', setClock);

	function setClock(evt) {
		var hour, angle;
		hour = $(this).val();
		angle = 270 + (hour * 30);
		drawCircle(clock.radius, clock.color);
		drawCircle(clock.centerRadius, clock.centerColor);
		drawNumbers();

		drawHand(hands.minute.radius, hands.minute.color, hands.minute.angle);
		drawHand(hands.hour.radius, hands.hour.color, angle);
	}



	function drawCircle(radius, color) {
		context.beginPath();
		context.arc(clock.centerX, clock.centerY, radius, 0, 2 * Math.PI, false);
		context.fillStyle = color;
		context.fill();
		context.lineWidth = 8;
		context.strokeStyle = '#003300';
		context.stroke();
	}

	function drawNumbers() {
		var number, iString, coordinates;
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
		var coordinates, hand;
		coordinates = getCoordinates(radius, angle);
		hand = new Image();
		hand.src = "images/hand.png";

		context.beginPath();
		context.moveTo(clock.centerX, clock.centerY);
		context.lineTo(coordinates[0], coordinates[1]);
		context.strokeStyle = color;
		context.stroke();

		hand.onload = function() {
			context.save();
			context.translate(coordinates[0], coordinates[1]);
			context.rotate((angle + 90) * Math.PI/180);
			context.drawImage(this, -43, -120, 86, 120);
			context.restore();
		}

	}

	function getCoordinates(radius, angle) {
		var x, y;
		x = clock.centerX + radius * Math.cos(angle * (Math.PI /180));
		y = clock.centerY + radius * Math.sin(angle * (Math.PI/180));
		return [x, y];
	}

});