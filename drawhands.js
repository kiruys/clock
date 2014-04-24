

$(document).ready(function () {

	setHands();

});

/**
 * draws the arms and hands of the clock based on the hands properties.
 * computes the area that can be used to move each hand.
 */
function setHands() {
	drawHand(hands.minute.radius, hands.minute.color, hands.minute.angle);
	drawHand(hands.hour.radius, hands.hour.color, hands.hour.angle);
	hands.hour.area = getHandArea(hands.hour.radius, hands.hour.angle);
	hands.minute.area = getHandArea(hands.minute.radius, hands.minute.angle);
	$.event.trigger({
		type: "handsSet"
	});
}

/**
 * computes the area that can be used to move each hand.
 * based on the position of the hand, the coordinates of the imagecenter are computed.
 * around the center, the corner coordinates of a 90 x 90 pixel square are determined and returned.
 */
function getHandArea(radius, angle) {
	var coords = getCoordinates(radius, angle);
	return {top: coords[1] - 45, bottom: coords[1] + 45, left: coords[0] - 45, right: coords[0] + 45};
}

/**
 * draws a hand with radius, color, and angle as params and clockCenter as starting point.
 * at the end of the hand, an arrow is drawn.
 */
function drawHand(radius, color, angle) {

	var coordinates;
	coordinates = getCoordinates(radius, angle);

	context.beginPath();
	context.lineWidth = hands.lineWidth;
	context.lineCap = 'round';
	context.strokeStyle = color;
	
	context.moveTo(clock.centerX, clock.centerY);
	context.lineTo(coordinates[0], coordinates[1]);
	
	context.save();
	context.translate(coordinates[0], coordinates[1]);
	context.rotate((angle + 90) * Math.PI/180);
	context.lineTo(25, 45);
	context.lineTo(-25, 45);
	context.lineTo(0, 0);
	context.lineJoin='round';
	context.stroke();
	context.restore();

	// hand = new Image();
	// hand.src = hands.image.url;
	// hand.onload = function() {
	// 	context.save();
	// 	context.translate(coordinates[0], coordinates[1]);
	// 	context.rotate((angle + 90) * Math.PI/180);
	// 	context.drawImage(this, hands.image.width/-2, hands.image.height * -1, hands.image.width, hands.image.height);
	// 	context.restore();
	// }
}