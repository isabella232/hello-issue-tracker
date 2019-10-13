const title = 'React works';
const $container = document.querySelector('#hello-issue-tracker');

if ($container) {
	ReactDOM.render(
		<div>{title}</div>,
		$container
	);
}
