$(document).ready(function () {

	$('select#hours').on('change', setClock);
	$('select#minutes').on('change', setClock);

	canvas.addEventListener('mousedown', turnOn);
	canvas.addEventListener('mousemove', moveHand);
	canvas.addEventListener('mouseup', turnOff);

	/**
	 * reads the value of the hour and minute dropdowns and sets the clock accordingly.
	 * the hour hand not only reflects hours but also minutes.
	 */
	function setClock() {
		var hour, minutes;
		hour = $('#hours').val();
		minutes = $('#minutes').val();

		hands.minute.angle = 270 + (minutes * 6);
		hands.hour.angle = 270 + (hour * 30);
		hands.hour.angle = (Math.floor(hands.hour.angle/30) * 30) + (1/2 * minutes);

		drawClock();
		setHands();
	}

	function turnOn(evt) {
		var startCoords;
		evt.preventDefault();
		startCoords = getClickCoords(evt);

		if (hands.on === false) {
			hands.on = true;
			hands.active = matchClickCoords(startCoords.x, startCoords.y);
			return;
		}
	}

	/**
	 * returns the coordinates of a mouseclick on the screen.
	 * x and y position are translated to the canvas coordinates, 
	 * so they can be matched with hand areas.
	 */
	function getClickCoords(evt) {
		var x, y;

		if (evt.pageX || evt.pageY) { 
			x = evt.pageX;
			y = evt.pageY;
		}

		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;
		x *= 500/$('#canvas_clock').width();
		y *= 500/$('#canvas_clock').height();

		return {x: x, y: y};
	}

	/**
	 * checks if a mouseclick occurred within one of the hands' areas.
	 * if so, the function returns which area.
	 */
	function matchClickCoords(x, y) {
		if (x > hands.hour.area.left & x < hands.hour.area.right & y > hands.hour.area.top & y < hands.hour.area.bottom) {
			return 'hour';
		}
		if (x > hands.minute.area.left & x < hands.minute.area.right & y > hands.minute.area.top & y < hands.minute.area.bottom) {
			return 'minute';
		}
	}

	function moveHand(evt) {
		var coords, newAngle = 0;
		if (hands.on === false) {
			return;
		}

		if (hands.active === 'hour') {
			coords = getClickCoords(evt);
			newAngle = getAngle(coords.x, coords.y);
			if (newAngle !== hands.hour.angle) {
				hands.hour.angle = newAngle;
				drawClock();
				setHands();
				return;
			}

		}

		if (hands.active === 'minute') {
			coords = getClickCoords(evt);
			newAngle = resetAngle(getAngle(coords.x, coords.y));
			if (newAngle !== hands.minute.angle) {
				hands.minute.angle = newAngle;
				hands.hour.angle = adjustHourAngleToMinuteAngle();
				drawClock();
				setHands();
				return;
			}

		}
	}

	/**
	 * gets the angle between the center of the clock and point defined by xCoord and yCoord in degrees.
	 */
	function getAngle(xCoord, yCoord) {
		var p1, p2;
		p1 = {
			x: clock.centerX,
			y: clock.centerY
		};
 		p2 = {
			x: xCoord,
			y: yCoord
		};
		// angle in radians: var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
		// angle in degrees:
		return Math.floor(Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI);
	}

	function turnOff() {
		if (hands.on === true) {
			hands.on = false;
			hands.active = undefined;
		}
	}

	function adjustHourAngleToMinuteAngle() {
		var adjustedAngle, minutes;
		minutes = getMinutes(resetAngle(hands.minute.angle));
		if (minutes > 55 & hands.hour.extra === false) {
			console.log('aan');
			hands.hour.extra = true;
		}
		if (minutes < 5 & minutes > 0 & hands.hour.extra === true) {
			console.log('uit');
			hands.hour.extra = false;
		}
		// if (hands.hour.extra === false) {
			adjustedAngle = resetAngle((Math.floor(hands.hour.angle/30) * 30) + (1/2 * minutes));
			return adjustedAngle;	
		// }
		// if (hands.hour.extra === true) {
		// 	adjustedAngle = resetAngle((Math.floor(hands.hour.angle/30) * 30) + 30);
		// 	hands.hour.extra = false;
		// 	return adjustedAngle;
		// }

	}

});