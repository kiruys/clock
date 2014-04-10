$(document).ready(function () {
	drawClock();

	function drawClock() {

		var canvas, context, centerX, centerY, clock_color, clock_radius, center_color, center_radius;
		
		canvas = document.getElementById("canvas_clock");
		context = canvas.getContext('2d');
		centerX = canvas.width / 2;
		centerY = canvas.height / 2;
		clock_radius = canvas.height / 2 * 0.8;
		clock_color = "yellow";
		center_color = "black";
		center_radius = canvas.height * 0.03;

		if (canvas.getContext){
			drawCircle(clock_radius, clock_color);
			drawCircle(center_radius, center_color);
			drawNumbers();

		}
		function drawCircle(radius, color) {
			context.beginPath();
			context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			context.fillStyle = color;
			context.fill();
			context.lineWidth = 6;
			context.strokeStyle = '#003300';
			context.stroke();
		}

		function drawNumbers() {
			var number_radius, number_angle, numberX, numberY, iString;
			number_radius = canvas.height / 2 * 0.65;
			number_angle = 300;

			context.font = "bold 50px sans-serif";
			context.textAlign = "center";
			context.textBaseline = "middle";

			for (var i = 1; i <= 12; i++) {
				alert(i);
				iString = i.toString();
				numberX = centerX + number_radius * Math.cos(number_angle * (Math.PI /180));
				numberY = centerY + number_radius * Math.sin(number_angle * (Math.PI/180));
				context.fillText(iString, numberX, numberY);
				number_angle += 30;
			}
		}
	}





});