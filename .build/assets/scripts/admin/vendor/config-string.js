import {strings} from "./plugin";

export default {
	data: function () {
		return {
			string: function (key) {
				if (key in strings) {
					return strings[key];
				}
				console.warn(`'${key}' not found in plugin strings`);
				return '';
			}
		}
	}
};
