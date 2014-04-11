$(document).ready(function () {
	drawClock();

	function drawClock() {
		var canvas, context, clock, hands, hand;	
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
			drawHandEnd();
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
			var coordinates, hand;
			coordinates = getCoordinates(radius, angle);

			context.beginPath();
			context.moveTo(clock.centerX, clock.centerY);
			context.lineTo(coordinates[0], coordinates[1]);
			context.strokeStyle = color;
			context.stroke();


		}

		function drawHandEnd() {
			var hand, hourCoord;
			hand = new Image();
			hand.src = "images/hand.png";

			hourCoord = getCoordinates(hands.hour.radius, hands.hour.angle);
			minuteCoord = getCoordinates(hands.minute.radius, hands.minute.angle);

			hand.onload = function() {
				context.beginPath();
				context.save();
				context.translate(hourCoord[0], hourCoord[1]);
				context.rotate((hands.hour.angle + 90) * Math.PI/180);
    			context.drawImage(this, -43, -120, 86, 120);
    			context.restore();

    			context.translate(minuteCoord[0], minuteCoord[1]);
				context.rotate((hands.minute.angle + 90) * Math.PI/180);
    			context.drawImage(this, -43, -120, 86, 120);

  			};
		}

		function getCoordinates(radius, angle) {
			var x, y;
			x = clock.centerX + radius * Math.cos(angle * (Math.PI /180));
			y = clock.centerY + radius * Math.sin(angle * (Math.PI/180));
			return [x, y];
		}
	}





});