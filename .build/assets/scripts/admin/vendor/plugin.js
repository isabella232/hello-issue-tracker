import {snakeToCamel} from "./helpers";

const pluginConfig = {};
let pluginStrings = {};
if ('HelloIssueTrackerConfig' in window) {
	Object.keys(window.HelloIssueTrackerConfig).forEach(key => {
		if (key === 'strings') {
			pluginStrings = window.HelloIssueTrackerConfig[key];
		} else {
			pluginConfig[snakeToCamel(key)] = window.HelloIssueTrackerConfig[key];
		}
	});
}

export const strings = key => {
	if (key in pluginStrings) {
		return pluginStrings[key];
	}
	console.warn(`'${key}' not found in plugin strings`);
	return '';
};

export const config = pluginConfig;
