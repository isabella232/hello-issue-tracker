// @ flow

import React from 'react';
import {Editor as TinyEditor} from '@tinymce/tinymce-react';

type Props = {
	value?: string,
	onChange: Function,
	toolbar?: 'small' | 'big',
	plugins?: Array,
	height: number,
};

export class Editor extends React.Component<Props> {

	static defaultProps = {
		value: '',
		toolbar: 'small',
		plugins: [],
		height: 200,
	};

	render() {
		let toolbar = 'bold italic link image | bullist numlist | hitimage';
		if (this.props.toolbar === 'big') {
			toolbar = 'formatselect | bold italic link image | bullist numlist | hitimage';
		}

		const plugins = ['lists', 'link', 'hitimage'].concat(this.props.plugins);

		return (
			<TinyEditor
				value={this.props.value}
				init={{
					height: this.props.height,
					menubar: false,
					plugins: plugins.join(' '),
					toolbar,
					autoresize_bottom_margin: 15,
					content_style: "body {font-size: 12px;} img {max-width: 99% !important;}",
					relative_urls: false,
					remove_script_host: false,
					convert_urls: true
				}}
				onChange={e => this.props.onChange(e.target.getContent())}
			/>
		);
	}
}
