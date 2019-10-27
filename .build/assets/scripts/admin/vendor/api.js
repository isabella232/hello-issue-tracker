// @flow

import {config} from "./plugin";
import {parseComment, parseIssue} from "./helpers";
import type {ApiFetchData, ApiFetchMethod, IssueObject} from "./types";
import moment from "moment/moment";

export const doApi: Function = async (path: string, data: ApiFetchData = {}, method: ApiFetchMethod = 'GET') => {
	if (!config.gitlab.repoId) {
		return false;
	}

	const urlParams: Array<string> = [];
	Object.keys(data).forEach(key => {
			urlParams.push(`${key}=${encodeURI(data[key])}`);
		}
	);
	const url: string = config.gitlab.apiBase + path + '?' + urlParams.join('&');

	return fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			'PRIVATE-TOKEN': config.gitlab.privateToken
		}
	});
	/*
	return new Promise(resolve => {
		const urlParams = [];
		for (const [key, value] of Object.entries(data)) {
			urlParams.push(`${key}=${encodeURI(value)}`);
		}
		const url = apiBase + path + '?' + urlParams.join('&');

		jQuery.ajax({
			type: type,
			beforeSend: function (request) {
				request.setRequestHeader(v);
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
	*/
};

export const fetchIssues: Object = async (options: ApiFetchData = {}, iid: number = 0) => {
	let url = `projects/${config.gitlab.repoId}/issues`;
	if (iid !== 0) {
		url = `projects/${config.gitlab.repoId}/issues/${iid}`;
	}
	const response = await doApi(url, options);
	const issues = await response.json();
	const r = [];

	if (Array.isArray(issues)) {
		issues.forEach(issue => {
			r.push(parseIssue(issue));
		});
	} else {
		r.push(parseIssue(issues));
	}

	return r;
};

export const fetchComments: Array = async (iid) => {
	const response = await doApi(`projects/${config.gitlab.repoId}/issues/${iid}/notes`, {
		'sort': 'asc'
	});
	const comments = await response.json();
	const r = [];

	comments.forEach(comment => {
		r.push(parseComment(comment));
	});

	return r;
};

/*

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

export const load_comments = function (iid) {
    if (!plugin.repo) {
        return false;
    }


    return do_api(`projects/${plugin.repo}/issues/${iid}/notes`, {
        'sort': 'asc'
    });
};

export const create_comment = function (iid, data) {
    if (!plugin.repo) {
        return false;
    }
    return do_api(`projects/${plugin.repo}/issues/${iid}/notes`, data, 'POST');
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
*/
