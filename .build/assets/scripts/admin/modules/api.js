import {plugin} from './settings.js';

const apiBase = `${plugin.APIbase}api/v4/`;

function do_api(path, data = {}, type = 'GET') {
	if (!plugin.key) {
		return false;
	}
	return new Promise(resolve => {
		const urlParams = [];
		for (const [key, value] of Object.entries(data)) {
			urlParams.push(`${key}=${encodeURI(value)}`);
		}
		const url = apiBase + path + '?' + urlParams.join('&');

		jQuery.ajax({
			type: type,
			beforeSend: function (request) {
				request.setRequestHeader("PRIVATE-TOKEN", plugin.key);
			},
			url: url,
			success: function (data) {
				data.response = true;
				resolve(data);
			},
			error: function () {
				resolve({response: false});
			},
		});
	});
}

export const get_issues = function (options) {
	if (!plugin.repo) {
		return false;
	}
	return do_api(`projects/${plugin.repo}/issues`, options);
};

export const get_issue = function (iid) {
	if (!plugin.repo) {
		return false;
	}
	return do_api(`projects/${plugin.repo}/issues/${iid}`, options);
};

export const create_issue = function (data) {
	if (!plugin.repo) {
		return false;
	}
	return do_api(`projects/${plugin.repo}/issues`, data, 'POST');
};

export const update_issue = function (iid, data) {
	if (!plugin.repo) {
		return false;
	}
	return do_api(`projects/${plugin.repo}/issues/${iid}`, data, 'PUT');
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