import moment from "moment/moment";
import {plugin} from "../modules/settings";

export const templateIssueMain = function (issue) {

	let author = issue.author.name;
	if (issue.hit_label.author) {
		author = issue.hit_label.author;
	}

	const date = moment(issue.created_at).format('MMMM Do YYYY, h:mm a');
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
			<div class="hit-issue__comments">
				<ul class="hit-issue__comment-list"></ul>
				<div class="hit-issue__comment-loader"></div>
			</div>	
		</div>`;
};