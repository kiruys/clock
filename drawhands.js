$(document).ready(function () {

	setHands();

});

/**
 * draws the arms and hands of the clock based on the hands properties.
 * computes the area that can be used to move each hand.
 * displays the time in words.
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
 * based on the position of the hand image, the coordinates of the imagecenter are computed.
 * around the center, the corner coordinates of a 90 x 90 pixel square are determined and returned.
 */
function getHandArea(radius, angle) {
	var coords = getCoordinates(radius + (hands.image.height/2), angle);
	return {top: coords[1] - 45, bottom: coords[1] + 45, left: coords[0] - 45, right: coords[0] + 45};
}

/**
 * draws a hand with radius, color, and angle as params and clockCenter as starting point.
 * at the end of the hand, a hand image is positioned,
 */
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