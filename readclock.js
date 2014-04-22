$(document).ready(function () {
	
	readClock();

	$(document).on("handsSet", function() {
		readClock();
	});

	/**
	 * presents the time on the clock in words on the screen. 
	 */
	function readClock() {
		var hourAngle, minuteAngle;
		hourAngle = resetAngle(hands.hour.angle);
		minuteAngle = resetAngle(hands.minute.angle);
		$('#clock-time').text(getHour(hourAngle) + ' uur en ' + getMinutes(minuteAngle) + ' minuten');
	}

	/**
	 * sets the angle to a number between 0 and 360
	 */
	function resetAngle(angle) {
		if (angle > 360) {
			return angle -= 360;
		}
		if (angle <= 0) {
			return angle += 360;
		}
		if (angle > 0 & angle < 360) {
			return angle;
		}
	}
	
	/**
	 * getHour returns the hour, rounded off to full hours based on the angle of the hourhand.
	 */
	function getHour(hourAngle) {
		var angle, hour;
		angle = resetAngle(hourAngle-270);
		hour = Math.floor(angle/30);
		if (hour > 0) {
			console.log(hour);
			return hour;
		}
		if (hour === 0) {
			hour = 12;
			console.log(hour);
			return 12;
		}
	}

	/**
	 * getMinutes returns the minutes rounded of to full minutes based on the angle of the minutehand.
	 *
	 */
	function getMinutes(minuteAngle) {
		var minutes = resetAngle(minuteAngle-270);
		if (Math.floor(minutes/6) === 60) {
			return 0;
		}
		if (Math.floor(minutes/6) < 60) {
			return Math.floor(minutes/6);
		}
	}

});