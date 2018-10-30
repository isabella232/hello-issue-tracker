import {plugin} from './modules/settings.js';

(function ($) {
	$(function () {
		const $notes = $('table span[class*="note"]');

		$notes.each(function () {

			const $note = $(this);
			const innerHtml = $note.html();
			const noteNumber = getNoteId(innerHtml.trim());
			if (noteNumber === '&nbsp;') {
				$note.hide();
				return true;
			} else if (noteNumber === 'Note') {
				return true;
			}

			const categoryUrl = plugin.matchedCategoryUrl;
			if (!categoryUrl) {
				return true;
			}

			/**
			 * Set Up Notes Links
			 */

				// Notes if more than one Number/Note is in the trigger
			let values = '';
			let separator = '';
			if (innerHtml.indexOf('/') !== -1) {
				values = innerHtml.split('/');
				separator = '/';
			} else {
				values = innerHtml.split(',');
				separator = ',';
			}

			let resolvedNotes = [];
			for (let i = 0; i < values.length; i++) {
				const url = `${plugin.AjaxURL}?action=${plugin.ajaxAction}&link=${categoryUrl}&note=${values[i].trim()}`;
				const note = values[i].trim();
				resolvedNotes.push(`<a data-href="${url}" class="note__link">${note}</a>`);
			}
			resolvedNotes.join(separator);
			$note.html(resolvedNotes);
		});
	});

	/**
	 * Fancybox
	 */

	$(document).on('click', '.note__link', function (e, element) {
		$.fancybox.open({
			src: $(this).attr('data-href'),
			type: 'ajax',
		});
		return false;
	});

	function getNoteId(string) {
		let output = '';
		output = string.replace(".", "\\.");
		output = output.replace("(", "");
		output = output.replace(")", "");
		return output;
	}
})(jQuery);