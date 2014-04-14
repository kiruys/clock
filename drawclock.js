$(document).ready(function () {

	var canvas, context, clock, hands;	
	canvas = document.getElementById("canvas_clock");
	context = canvas.getContext('2d');

	clock = {	color: 'yellow',
				centerColor: 'black',
				radius: canvas.height / 2 * 0.9,
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
						radius : canvas.height / 2 * 0.30,
						angle : 270,
						color : 'red'
				},
				lineWidth : 5,
				image : {
						url : "images/hand.png",
						width : 60,
						height : 90
				}
			};

	number =	{ 	radius : canvas.height / 2 * 0.75,
					angle : 300,
					font : "bold 30px sans-serif"
				};


	if (canvas.getContext){
		drawClock();
		setClock();
	}

	$('select#hours').on('change', setClock);
	$('select#minutes').on('change', setClock);
	//canvas.addEventListener('mousedown', moveHand);
	canvas.addEventListener('mousemove', moveHand);
	// $('#canvas_clock').on('mousedown', down);
	// $('#canvas_clock').on('mouseup', moveHand);

	function down() {
		console.log('down');
	}

	function up() {
		console.log('up');
	}

	function moveHand(evt) {
		evt.preventDefault();
		var x, y;
		if (evt.pageX || evt.pageY) { 
			x = evt.pageX;
			y = evt.pageY;
		}
		// else { 
		// 	x = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		// 	y = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
		// } 
		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;
		x *= 500/$('#canvas_clock').width();
		y *= 500/$('#canvas_clock').height();

		if (x > hands.hour.area.left & x < hands.hour.area.right & y > hands.hour.area.top & y < hands.hour.area.bottom) {
			//alert('hourhand');
		}
		if (x > hands.minute.area.left & x < hands.minute.area.right & y > hands.minute.area.top & y < hands.minute.area.bottom) {
			//alert('minutehand');
		}

		else {
			hands.hour.angle = getAngle(x,y);
			drawClock();
			setHands();
		}
	}	

	function drawClock() {
		drawCircle(clock.radius, clock.color);
		drawCircle(clock.centerRadius, clock.centerColor);
		drawNumbers();
	}

	function setClock(evt) {
		var hour, minutes;

		if (evt === undefined) {
			setHands();
			return;
		}
		if (evt !== undefined & $(evt.target).attr('id') === 'hours') {
			hour = $(this).val();
			hands.hour.angle = 270 + (hour * 30);
			drawClock();
			setHands();
			return;
		}
		if (evt !== undefined & $(evt.target).attr('id') === 'minutes') {
			minutes = $(this).val();
			hands.minute.angle = 270 + (minutes * 6);
			drawClock();
			setHands();
			return;
		}
	}

	function setHands() {
		drawHand(hands.minute.radius, hands.minute.color, hands.minute.angle);
		drawHand(hands.hour.radius, hands.hour.color, hands.hour.angle);
		hands.hour.area = getHandArea(hands.hour.radius, hands.hour.angle);
		hands.minute.area = getHandArea(hands.minute.radius, hands.minute.angle);
	}

	function getHandArea(radius, angle) {
		var coords = getCoordinates(radius + (hands.image.height/2), angle);
		return {top: coords[1] - 45, bottom: coords[1] + 45, left: coords[0] - 45, right: coords[0] + 45};
	}

	function drawCircle(radius, color) {
		context.beginPath();
		context.arc(clock.centerX, clock.centerY, radius, 0, 2 * Math.PI, false);
		context.fillStyle = color;
		context.fill();
		context.lineWidth = 4;
		context.strokeStyle = '#003300';
		context.stroke();
	}

	function drawNumbers() {
		var iString, coordinates;

		context.font = number.font;
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
		var coordinates, hand, handEndCoords;
		coordinates = getCoordinates(radius, angle);
		
		hand = new Image();
		hand.src = hands.image.url;

		context.beginPath();
		context.lineWidth = hands.lineWidth;
		context.lineCap = 'round';
		context.moveTo(clock.centerX, clock.centerY);
		context.lineTo(coordinates[0], coordinates[1]);
		context.strokeStyle = color;
		context.stroke();

		hand.onload = function() {
			context.save();
			context.translate(coordinates[0], coordinates[1]);
			context.rotate((angle + 90) * Math.PI/180);
			context.drawImage(this, hands.image.width/-2, hands.image.height * -1, hands.image.width, hands.image.height);
			context.restore();
		}

	}

	function getCoordinates(radius, angle) {
		var x, y;
		x = clock.centerX + radius * Math.cos(angle * (Math.PI /180));
		y = clock.centerY + radius * Math.sin(angle * (Math.PI/180));
		return [x, y];
	}

	function getAngle(xCoord, yCoord) {
		var p1 = {
			x: clock.centerX,
			y: clock.centerY
		};
 
		var p2 = {
			x: xCoord,
			y: yCoord
		};
 
		// angle in radians
		var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
		 
		// angle in degrees
		return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
	}

});