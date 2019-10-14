//import ReactDOM from 'react-dom';
//import React from 'react';

import App from './app.jsx';

const $container = document.querySelector('#hello-issue-tracker');

if ($container) {
	ReactDOM.render(
		<App/>,
		$container
	);
}
