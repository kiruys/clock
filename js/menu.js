$(document).ready(function () {

	activateLevel();

	$('a[data-link]').on('click', showChoice);
	$('button[data-level]').on('click', setLevel);

	function activateLevel() {
		var level = localStorage['level'];
		if (level === undefined) {
			return;
		}
		if (level !== undefined) {
			$('button[data-level]').removeClass('active-level');
			$('button[data-level="' + level + '"]').addClass('active-level');
			return;
		}
	}

	function showChoice(evt) {
		evt.preventDefault();
		var id = $(evt.target).data('link');
		$('a[data-link]').removeClass('active');
		$(evt.target).addClass('active');

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

	function setLevel(evt) {
		localStorage['level'] = $(evt.target).data('level');
		activateLevel();
	}

});