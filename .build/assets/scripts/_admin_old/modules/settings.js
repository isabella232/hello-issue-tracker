import * as settings from '../../../../../assets/settings.json';

const pluginObject = settings;
for (const attrname in HelloIssueTrackerVars) {
	pluginObject[attrname] = HelloIssueTrackerVars[attrname];
}

export const plugin = pluginObject;