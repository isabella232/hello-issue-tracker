let isActive = false;
let timeout = false;
const showFor = 5000;

document.body.innerHTML += '<div id="hit-feedback" class="hit-notice-float"></div>';
const $container = document.querySelector('#hit-feedback');

function showFeedback(text, feedbackClass = 'message') {

	let delay = 0;
	if (isActive) {
		delay = 300;
		hideFeedback();
	}

	window.setTimeout(() => {
		const dismiss = '<button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button>';
		$container.innerHTML = `<div class="hit-notice hit-notice--${feedbackClass}"><p>${text}</p></div>${dismiss}`;
		$container.classList.add('hit-notice-float--visible');
		$container.querySelector('button.notice-dismiss').onclick = e => {
			hideFeedback();
		};
		isActive = true;
		timeout = window.setTimeout(() => {
			hideFeedback();
		}, showFor);
	}, delay);
}

function hideFeedback() {
	$container.classList.remove('hit-notice-float--visible');
	isActive = false;
	clearTimeout(timeout);
}

export const feedback = (text, feedbackClass) => showFeedback(text, feedbackClass);
export const feedbackNotice = text => showFeedback(text);
export const feedbackError = text => showFeedback(text, 'error');
export const feedbackWarn = text => showFeedback(text, 'warn');
export const feedbackSuccess = text => showFeedback(text, 'success');


