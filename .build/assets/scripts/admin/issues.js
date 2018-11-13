import {plugin} from './modules/settings.js';
import {get, get_issues, parse_issue} from './modules/api';
import {templateIssueList} from './template/issue-list';
import {templateIssueMain} from './template/issue-main';

(function ($) {
	$(function () {
		const $page = $('.hit-page');
		const $container = $page.find('.hit-issues');
		const $loader = $container.find('.hit-issues__loader');
		const $options = $container.find('.hit-issues__option select');
		const $list = $container.find('.hit-issues__list');
		const $main = $page.find('.hit-page__main');
		let options = {};
		let store = {};

		$options.on('change', () => {
			set_options();
			load_issues();
		});

		set_options();
		load_issues();

		async function load_issues() {
			$loader.fadeIn(200);
			const issues = await get_issues(options);
			store = {};
			$list.html('');
			for (const value of issues) {
				store[value.iid] = parse_issue(value);
				$list.append(templateIssueList(store[value.iid]));
			}
			$('.hit-issue-list').on('click', function () {
				const iid = $(this).attr('data-iid');
				$main.html(templateIssueMain(store[iid]));
			});
			$loader.fadeOut(200);
		}

		function set_options() {
			$options.each(function () {
				options[$(this).attr('name')] = $(this).val();
			});
		}
	});
})(jQuery);