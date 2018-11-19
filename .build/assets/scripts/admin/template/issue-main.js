import moment from "moment/moment";
import {plugin} from "../modules/settings";
import {create_comment} from "../modules/api";

export const templateIssueMain = function (issue) {

	let author = issue.author.name;
	if (issue.hit_label.author) {
		author = issue.hit_label.author;
	}

	const date = moment(issue.created_at).format(plugin.dateFormat);
	const state = ((issue.state in plugin.issue.states) ? plugin.issue.states[issue.state] : issue.state);
	const type = ((issue.hit_label.type in plugin.issue.types) ? plugin.issue.types[issue.hit_label.type] : issue.hit_label.type);
	const priority = ((issue.hit_label.priority in plugin.issue.priorities) ? plugin.issue.priorities[issue.hit_label.priority] : issue.hit_label.priority);

	const showdown = require('showdown');
	let description = issue.description || '';
	const converter = new showdown.Converter();
	description = converter.makeHtml(description);

	return `<div class="hit-issue">
			<header class="hit-issue__header">
				<span class="hit-issue__created"><b>${author}</b> / ${date}</span>
				${(issue.state === 'opened' ? `<button class="button button--close js-hit-close-issue" data-iid="${issue.iid}">Close Issue</button><button class="button button-primary js-hit-edit-issue" data-iid="${issue.iid}">Edit Issue</button>` : `<span class="hit-issue-label hit-issue-label--big hit-issue-label--color-green">${state}</span>`)}
			</header>
			<div class="hit-issue__status">
				Type: <span class="hit-issue-label hit-issue-label--type-${issue.hit_label.type}">${type}</span>
				Priority: <span class="hit-issue-label hit-issue-label--prio-${issue.hit_label.priority}">${priority}</span>
			</div>
			<h2 class="hit-issue__title">${issue.title}</h2>
			<div class="hit-issue__subtitle">			
				<span class="hit-issue__labels">${issue.labels.map(label => `<span class="hit-issue-label hit-issue-label--small">${label}</span>`).join(' ')}</span>
			</div>			
			<div class="hit-issue__description">${description}</div>
			<div class="hit-issue__comments hit-comments">
				<ul class="hit-comments__list"></ul>
				<form action="" class="hit-comments__form hit-edit js-hit-new-comment-form">
					<input type="hidden" name="iid" value="${issue.iid || 'new'}" />
					<div class="hit-edit__element">
						<textarea id="hit-edit-comment-body" class="hit-edit__textarea" name="body"></textarea>
					</div>
					<div class="hit-edit__element hit-edit__element--controls">
						<button type="submit" class="button button-primary">${'Add comment'}</button>
					</div>
				</form>
				<div class="hit-comments__loader hit-loader hit-loader--gray hit-loader--small"></div>
			</div>	
		</div>`;
};

export const submitComment = function ($form) {

	const input = $form.serializeObject();
	const data = {};

	if ('' === input.body) {
		return {
			response: false
		};
	}

	const showdown = require('showdown');
	const converter = new showdown.Converter();
	input.body += `<p>${plugin.labelPrefix}author: ${plugin.user}</p>`;

	data.body = converter.makeMarkdown(input.body);

	return new Promise(resolve => {
		resolve(create_comment(input.iid, data));
	});
};