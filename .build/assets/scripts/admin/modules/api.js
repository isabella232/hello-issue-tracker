import {plugin} from './settings.js';

const apiBase = `${plugin.APIbase}api/v4/`;

function get_api(path, params = {}) {
	if (!plugin.key) {
		return false;
	}
	return new Promise(resolve => {

		const urlParams = [];
		urlParams.push(`private_token=${plugin.key}`);
		for (const [key, value] of Object.entries(params)) {
			urlParams.push(`${key}=${value}`);
		}

		const url = apiBase + path + '?' + urlParams.join('&');
		jQuery.getJSON(url, function (json) {
			resolve(json);
		});
	});
}

export const get_issues = function (options) {
	if (!plugin.repo) {
		return false;
	}
	return get_api(`projects/${plugin.repo}/issues`, options);
};

export const get_issue = function (issueID) {

};

export const parse_issue = function (obj) {
	obj['hit_label'] = {};
	for (const label of obj.labels) {
		const regex = new RegExp(`${plugin.labelPrefix}([a-z0-9]*): `);
		const match = regex.exec(label);
		let index = 0;
		if (match != null) {
			obj['hit_label'][match[1]] = label.replace(match[0], '');
			obj['labels'] = obj['labels'].filter(e => e !== label);
		}
	}

	for (const key of ['author', 'type', 'priority']) {
		if (!(key in obj['hit_label'])) {
			obj['hit_label'][key] = '';
		}
	}
	return obj;
};