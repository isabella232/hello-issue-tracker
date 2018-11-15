import {plugin} from './modules/settings.js';
import {get, get_issues, parse_issue} from './modules/api';
import {templateIssueList} from './template/issue-list';
import {templateIssueMain} from './template/issue-main';
import {templateIssueForm} from './template/issue-edit';

(function ($) {
	$(function () {
		const $page = $('.hit-page');
		const $container = $page.find('.hit-issues');
		const $loader = $container.find('.hit-issues__loader');
		const $options = $container.find('.hit-issues__option select');
		const $list = $container.find('.hit-issues__list');
		const $main = $page.find('.hit-page__main');
		const $editWindow = $('.js-hit-edit-window');
		let options = {};
		let store = {};

		$('body').on('click', '.js-hit-create-issue, .js-hit-edit-issue', function () {

			let issue = false;
			const iid = $(this).attr('data-iid');
			if (typeof iid !== 'undefined') {
				issue = store[iid];
			}

			$editWindow.find('.js-hit-edit-content').html(templateIssueForm(issue));
			window.tinymce.init({
				selector: "#hit-edit-description",
				toolbar: 'formatselect | bold italic link image | bullist numlist',
				menubar: false,
				block_formats: 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;',
				plugins: 'lists autoresize link',
				autoresize_bottom_margin: 5,
				content_style: "body {margin-left: 0px; margin-right: 0px; font-size: 12px;}"
			});
			$editWindow.fadeIn(200);
		});

		$('.js-hit-edit-close').on('click', function () {
			$editWindow.fadeOut(200);
		});

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