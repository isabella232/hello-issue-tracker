import {plugin} from './modules/settings.js';

(function ($) {
	$(function () {
		$('#hit-credentials-form').on('submit', function (event) {

			event.preventDefault();

			const $form = $(this);
			const $button = $form.find('[type="submit"]');
			const $resp = $('.hit-options__response');
			const data = $form.serialize();

			$button.prop('disabled', true);
			$resp.slideUp(200);

			$.ajax({
				url: plugin['AjaxURL'],
				type: 'POST',
				dataType: 'json',
				data: data
			}).always(function (data) {

				if (data['type'] === null || data['type'] !== 'success') {

					/**
					 * error
					 */

					let msg_content = data['message'];
					if (msg_content === '' || msg_content === undefined) {
						msg_content = plugin['GeneralError'];
					}

					$resp.html(msg_content).slideDown(200);

				} else {

					/**
					 * success
					 */

					location.reload();
				}

				$button.prop('disabled', false);
			});
		});
	})
})(jQuery);