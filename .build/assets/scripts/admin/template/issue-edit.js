import {plugin} from "../modules/settings";
import '../modules/jquery.serializeObject';
import {create_issue, update_issue} from '../modules/api';

export const templateIssueForm = function (issue = false) {

	const showdown = require('showdown');
	let description = issue.description || '';
	const converter = new showdown.Converter();
	description = converter.makeHtml(description);

	return `<form class="hit-edit js-hit-edit-form">
			<input type="hidden" name="iid" value="${issue.iid || 'new'}" />
			<div class="hit-edit__element">
				<label for="hit-edit-title" class="hit-edit__label">Title</label>
				<input id="hit-edit-title" class="hit-edit__input" name="title" value="${issue.title || 'New issue'}" type="text">
			</div>
			<div class="hit-edit__element">
				<textarea id="hit-edit-description" class="hit-edit__textarea" name="description">${description}</textarea>
			</div>
			<div class="hit-edit__element">
				<label for="hit-edit-priority" class="hit-edit__label">Priority</label>
				<select id="hit-edit-priority" class="hit-edit__input" name="priority">
					${Object.keys(plugin.issue.priorities).map(key => `<option ${((issue && issue.hit_label.priority === key) ? 'selected' : '')} value="${key}">${plugin.issue.priorities[key]}</option>`)}
				</select>
			</div>
			<div class="hit-edit__element">
				<label for="hit-edit-type" class="hit-edit__label">Type</label>
				<select id="hit-edit-type" class="hit-edit__input" name="type">
					${Object.keys(plugin.issue.types).map(key => `<option ${((issue && issue.hit_label.type === key) ? 'selected' : '')} value="${key}">${plugin.issue.types[key]}</option>`)}
				</select>
			</div>
			<div class="hit-edit__element hit-edit__element--controls">
				<button type="submit" class="button button-primary">${(issue ? 'Update' : 'Create')}</button>
			</div>
			<span class="hit-edit__loader hit-loader" style="display: none;"></span>
		</form>`;
};

export const submitForm = function ($form, store) {

	const input = $form.serializeObject();
	const data = {};

	data.title = input.title;

	const showdown = require('showdown');
	const converter = new showdown.Converter();
	data.description = converter.makeMarkdown(input.description);

	const labels = [`${plugin.labelPrefix}type: ${input.type}`, `${plugin.labelPrefix}priority: ${input.priority}`];
	if (input.iid === 'new') {
		labels.push(`${plugin.labelPrefix}author: ${plugin.user}`);
	} else {
		labels.push(store[input.iid].hit_label.author);
	}

	store[input.iid].labels.forEach((label) => {
		if (!labels.includes(label) && '' !== label) {
			labels.push(label);
		}
	});

	data.labels = labels.join();

	return new Promise(resolve => {
		if (input.iid === 'new') {
			resolve(create_issue(data));
		} else {
			resolve(update_issue(input.iid, data));
		}
	});
};