// @flow

export type PluginConfig = {
	gitlab: {
		repoUrl: string,
		privateToken: string,
		repoId: number,
		apiBase: string,
	},
	issueAttributes: {
		[s: string]: {
			[s: string]: string,
		}
	},
	labelPrefix: string,
	user: string,
	dateFormat: string,
};

// API
export type ApiFetchData = { [s: string]: string };
export type ApiFetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Issue
export type IssueObject = {
	iid: number,
	title: string,
	description: string,
	author: string,
	authorLabel: string,
	date: string,
	state: 'closed' | 'opened',
	priority: string,
	type: string,
	labels: Array<string>,
	hitLabels: {
		author: string,
		type: string,
		priority: string,
	},
};

// Comment
export type CommentObject = {
	body: string,
	author: string,
	date: string,
};
