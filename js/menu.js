$(document).ready(function () {

	$('a[data-link]').on('click', showChoice);

	function showChoice(evt) {
		evt.preventDefault();
		var id = $(evt.target).data('link');

		$('.menu-item').each(function(index) {
			if($(this).attr('id') === id) {
				$(this).find('input').val('');
				$(this).show();
			}
			if($(this).attr('id') !== id) {
				$(this).hide();
			}
		});
	}

});