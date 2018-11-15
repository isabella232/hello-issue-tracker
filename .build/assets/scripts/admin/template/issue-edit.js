export const templateIssueForm = function (issue = false) {

	const showdown = require('showdown');
	let description = issue.description || '';
	const converter = new showdown.Converter();
	description = converter.makeHtml(description);
	console.log(description);

	return `<form class="hit-edit">
			<div class="hit-edit__element">
				<label for="hit-edit-title" class="hit-edit__label">Title</label>
				<input id="hit-edit-title" class="hit-edit__input" name="title" value="${issue.title || 'New issue'}" type="text">
			</div>
			<div class="hit-edit__element">
				<textarea id="hit-edit-description" class="hit-edit__textarea" name="description">${description}</textarea>
			</div>
		</form>`;
};