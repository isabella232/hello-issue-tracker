// @flow

export type PluginConfig = {
    gitlab: {
        repoUrl: string,
        privateToken: string,
        repoId: number
    },
    issueAttributes: {
        states: Object
    }
};

export type ApiFetchData = { [s: string]: string };
export type ApiFetchMethod = "GET" | "POST" | "PUT" | "DELETE";
