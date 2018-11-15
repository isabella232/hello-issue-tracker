import moment from "moment/moment";

export const templateIssueMain = function (issue) {

	return `<div>
			<h2>${issue.title}</h2>	
			<br><button class="button js-hit-edit-issue" data-iid="${issue.iid}">Edit</button>
		</div>`;
};