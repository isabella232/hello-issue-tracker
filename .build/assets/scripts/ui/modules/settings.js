import * as settings from '../../../../../assets/settings.json';

const pluginObject = settings;
for (const attrname in NhsNotesVars) {
	pluginObject[attrname] = NhsNotesVars[attrname];
}

export const plugin = pluginObject;