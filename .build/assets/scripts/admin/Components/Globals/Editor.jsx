// @ flow

import React from 'react';
import {Editor as TinyEditor} from '@tinymce/tinymce-react';

type Props = {
	value?: string,
	onChange: Function,
};

export class Editor extends React.Component<Props> {

	static defaultProps = {
		value: '',
	};

	render() {
		return (
			<TinyEditor
				initialValue={this.props.value}
				init={{
					height: 500,
					menubar: false,
					plugins: 'lists autoresize link hitimage',
					toolbar: 'formatselect | bold italic link image | bullist numlist | hitimage',
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
