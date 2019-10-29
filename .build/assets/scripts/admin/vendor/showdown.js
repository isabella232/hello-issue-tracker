import {Converter} from 'showdown';

const converter = new Converter();

export const html2md = (string: string) => {
	return converter.makeMarkdown(string);
};

export const md2html = (string: string) => {
	return converter.makeHtml(string);
};
