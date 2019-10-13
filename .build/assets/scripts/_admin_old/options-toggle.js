import {plugin} from './modules/settings.js';

(function ($) {
	$(function () {
		$('.hello-issue-tracker .hit-options').each(function () {
			const $container = $(this);
			const $title = $(this).find('.hit-options__title');
			const $content = $(this).find('.hit-options__content');
			$content.css({
				'display': ($container.attr('data-hidden') === 'true' ? 'none' : 'block')
			});

			$title.on('click', function () {
				$content.slideToggle(200);
				const attrValue = ($container.attr('data-hidden') === 'true' ? 'false' : 'true');
				$container.attr('data-hidden', attrValue);
			});
		});
	})
})(jQuery);
