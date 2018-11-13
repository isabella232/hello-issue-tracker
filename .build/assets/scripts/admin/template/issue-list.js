import {plugin} from './../modules/settings';
import moment from "moment/moment";

export const templateIssueList = function (issue) {
	console.log(issue);
	let author = issue.author.name;
	if (issue.hit_label.author) {
		author = issue.hit_label.author;
	}

	const date = moment(issue.created_at).format('MMMM Do YYYY, h:mm a');

	return `<div data-iid="${issue.iid}" class="hit-issue-list hit-issue-list--${issue.state}" data-state="${plugin.translations[issue.state]}">
			<div class="hit-issue-list__item hit-issue-list__id">#${issue.iid}</div>
			<div class="hit-issue-list__item">
				<h3 class="hit-issue-list__title">${issue.title}</h3>
				<span class="hit-issue-list__created"><b>${author}</b> / ${date}</span>
				<span class="hit-issue-list__labels">${issue.labels.map(label => `<span class="hit-issue-label hit-issue-label--small">${label}</span>`).join(' ')}</span>
			</div>	 
			<div class="hit-issue-list__item"><span class="hit-issue-label hit-issue-label--type-${issue.hit_label.type}">${issue.hit_label.type}</span></div>	 
			<div class="hit-issue-list__item"><span class="hit-issue-label hit-issue-label--prio-${issue.hit_label.priority}">${issue.hit_label.priority}</span></div>	 
		</div>`;
};