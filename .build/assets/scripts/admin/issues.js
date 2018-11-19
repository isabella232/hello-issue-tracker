import {plugin} from './modules/settings.js';
import {do_api, get_issues, parse_issue, load_comments} from './modules/api';
import {templateIssueList} from './template/issue-list';
import {templateIssueMain, submitComment} from './template/issue-main';
import {templateIssueForm, submitForm} from './template/issue-edit';
import moment from "moment/moment";

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
		const descriptionEditorID = '#hit-edit-description';
		const commentEditorID = '#hit-edit-comment-body';
		const tinymce = window.tinymce;
		const tinymceOptions = {
			toolbar: 'formatselect | bold italic link image | bullist numlist',
			menubar: false,
			block_formats: 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;',
			plugins: 'lists autoresize link',
			autoresize_bottom_margin: 5,
			content_style: "body {margin-left: 0px; margin-right: 0px; font-size: 12px;}",
		};
		let changes = false;

		$page.on('click', '.js-hit-create-issue, .js-hit-edit-issue', function () {

			let issue = false;
			changes = false;
			const iid = $(this).attr('data-iid');
			if (typeof iid !== 'undefined') {
				issue = store[iid];
			}

			$editWindow.find('.js-hit-edit-content').html(templateIssueForm(issue));
			tinymce.init(Object.assign({
					selector: descriptionEditorID,
				}, tinymceOptions
			));

			$('.js-hit-edit-content .hit-edit__input').on('change', () => {
				changes = true;
			});

			$('.js-hit-edit-content .js-hit-edit-form').on('submit', async function (e) {
				e.preventDefault();
				const $formLoading = $('.hit-edit__loader');
				$formLoading.fadeIn(200);
				const submitted = await submitForm($(this), store);
				if (!submitted.response) {
					$formLoading.append('<div class="hit-loader__error">An unexpected error occured</div>');
					$formLoading.addClass('hit-loader--error');
					return;
				}
				$formLoading.fadeOut(200);
				changes = false;
				const newIssue = parse_issue(submitted);
				store[newIssue.iid] = newIssue;
				const $listElement = $list.find(`[data-iid="${newIssue.iid}"]`);
				if (!$listElement.length) {
					$list.prepend(templateIssueList(store[newIssue.iid]));
				} else {
					$listElement.replaceWith(templateIssueList(store[newIssue.iid]));
				}
				set_main(newIssue.iid);
				$editWindow.fadeOut(200, () => {
					tinymce.remove(descriptionEditorID);
				});
			});

			$editWindow.fadeIn(200);
		});

		$page.on('click', '.js-hit-close-issue', async function () {

			const iid = $(this).attr('data-iid');
			if (typeof iid === 'undefined' || !plugin.repo) {
				return;
			}

			if (!confirm('Are you sure you want to close this issue?')) {
				return;
			}

			const issue = await do_api(`projects/${plugin.repo}/issues/${iid}`, {
				state_event: 'close'
			}, 'PUT');

			if (!issue.response) {
				alert('An unexpected error occured');
				return;
			}

			$('#hit-issues-option-state').val('closed');
			set_options();
			load_issues().then(() => {
				set_main(iid);
			});
		});

		$('body').on('click', '.js-hit-edit-close', function () {
			if (changes) {
				if (!confirm('Your data is not saved yet. Are you sure you want to close the window?')) {
					return;
				}
			}

			$editWindow.fadeOut(200, () => {
				tinymce.remove(descriptionEditorID);
			});
		});

		$options.on('change', () => {
			set_options();
			load_issues();
		});

		set_options();
		load_issues().then(() => {
			console.log(store);
			if (window.location.hash !== '') {
				const currentIssue = window.location.hash.replace('#', '');
				set_main(currentIssue);
			}
		});

		$page.on('click', '.hit-issue-list', function () {
			const iid = $(this).attr('data-iid');
			set_main(iid);
		});

		function set_main(iid) {
			if (!iid in store) {
				return;
			}

			tinymce.remove(commentEditorID);
			$main.html(templateIssueMain(store[iid]));
			tinymce.init(Object.assign({
					selector: commentEditorID,
				}, tinymceOptions
			));

			$('.js-hit-new-comment-form').on('submit', async function (e) {
				e.preventDefault();
				const $commentLoader = $('.hit-comments__loader');
				$commentLoader.fadeIn(200);
				const submitted = await submitComment($(this));
				if (!submitted.response) {
					$commentLoader.append('<div class="hit-loader__error">An unexpected error occured</div>');
					$commentLoader.addClass('hit-loader--error');
					return;
				}
				set_main(iid);
			});

			load_comments(iid).then(resp => {
				const $commentLoader = $('.hit-comments__loader');
				const $commentList = $('.hit-comments__list');
				if (!resp.response) {
					$commentLoader.append('<div class="hit-loader__error">An unexpected error occured</div>');
					$commentLoader.addClass('hit-loader--error');
					return;
				}

				for (const comment of resp) {
					if (typeof comment !== 'object') {
						continue;
					}

					const showdown = require('showdown');
					let body = comment.body || '';
					const converter = new showdown.Converter();
					body = converter.makeHtml(body);
					const pPrefix = converter.makeHtml(plugin.labelPrefix).replace('<p>', '').replace('</p>', '');
					const date = moment(comment.created_at).format('MMMM Do YYYY, h:mm a');

					let author = comment.author.name;
					const regex = new RegExp(`<p>${pPrefix}author: ([^<]*)<\/p>`);
					const regexExec = regex.exec(body);
					if (regexExec) {
						author = regexExec[1];
						body = body.replace(regexExec[0], '');
					}

					$commentList.append(`<li>
						${body}
						<span class="hit-comments__comment-meta"><b>${author}</b> / ${date}</span>
					</li>`);
				}

				$commentLoader.fadeOut(200);
			});
		}

		async function load_issues() {
			$loader.fadeIn(200);
			const issues = await get_issues(options);
			if (!issues.response) {
				$loader.append('<div class="hit-loader__error">An unexpected error occured</div>');
				$loader.addClass('hit-loader--error');
				return;
			}

			store = {};
			$list.html('');
			for (const value of issues) {
				store[value.iid] = parse_issue(value);
				$list.append(templateIssueList(store[value.iid]));
			}
			$loader.fadeOut(200);
		}

		function set_options() {
			$options.each(function () {
				options[$(this).attr('name')] = $(this).val();
			});
		}
	});
})
(jQuery);