// @flow

import {snakeToCamel} from "./helpers";
import type {PluginConfig} from "./types";

const pluginConfig: Object = {};
let pluginStrings: Object = {};
if ('HelloIssueTrackerConfig' in window) {
    Object.keys(window.HelloIssueTrackerConfig).forEach(key => {
        if (key === 'strings') {
            pluginStrings = window.HelloIssueTrackerConfig[key];
        } else {
            pluginConfig[snakeToCamel(key)] = window.HelloIssueTrackerConfig[key];
        }
    });
}

export const strings = (key: string) => {
    if (key in pluginStrings) {
        return pluginStrings[key];
    }
    console.warn(`'${key}' not found in plugin strings`);
    return '';
};

export const config: PluginConfig = pluginConfig;
