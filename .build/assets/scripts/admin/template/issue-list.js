import {plugin} from './../modules/settings';
import moment from "moment/moment";

export const templateIssueList = function (issue) {

	let author = issue.author.name;
	if (issue.hit_label.author) {
		author = issue.hit_label.author;
	}

	const date = moment(issue.created_at).format('MMMM Do YYYY, h:mm a');
	const state = ((issue.state in plugin.issue.states) ? plugin.issue.states[issue.state] : issue.state);
	const type = ((issue.hit_label.type in plugin.issue.types) ? plugin.issue.types[issue.hit_label.type] : issue.hit_label.type);
	const priority = ((issue.hit_label.priority in plugin.issue.priorities) ? plugin.issue.priorities[issue.hit_label.priority] : issue.hit_label.priority);

	return `<div data-iid="${issue.iid}" class="hit-issue-list hit-issue-list--${issue.state}" data-state="${state}">
			<div class="hit-issue-list__item hit-issue-list__id">#${issue.iid}</div>
			<div class="hit-issue-list__item">
				<h3 class="hit-issue-list__title">${issue.title}</h3>
				<span class="hit-issue-list__created"><b>${author}</b> / ${date}</span>
				<span class="hit-issue-list__labels">${issue.labels.map(label => `<span class="hit-issue-label hit-issue-label--small">${label}</span>`).join(' ')}</span>
			</div>	 
			<div class="hit-issue-list__item"><span class="hit-issue-label hit-issue-label--type-${issue.hit_label.type}">${type}</span></div>	 
			<div class="hit-issue-list__item"><span class="hit-issue-label hit-issue-label--prio-${issue.hit_label.priority}">${priority}</span></div>	 
		</div>`;
};