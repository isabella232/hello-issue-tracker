import {plugin} from './modules/settings.js';
import {get, get_issues, parse_issue} from './modules/api';

(function ($) {
	$(function () {
		$('.hit-issues').each(function () {

			const $container = $(this);
			const $loader = $container.find('.hit-issues__loader');
			const $options = $container.find('.hit-issues__option select');
			const $list = $container.find('.hit-issues__list');
			let options = {};
			let store = {};

			$options.on('change', () => {
				set_options();
			});

			load_issues();

			async function load_issues() {
				$loader.fadeIn(200);
				const issues = await get_issues(options);
				store = {};
				$list.html('');
				for (const value of issues) {
					store[value.iid] = parse_issue(value);
					$list.append(issueTemplate(store[value.iid]));
				}
				$loader.fadeOut(200);
			}

			function set_options() {
				$options.each(function () {
					options[$(this).attr('name')] = $(this).val();
				});
				load_issues();
			}
		});
	});

	function issueTemplate(issue) {
		return `<li>
			#${issue.iid} ${issue.title}
		</li>`;
	}
})(jQuery);