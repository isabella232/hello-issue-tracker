// @flow

import {body, querySelector} from './type-utils';

let isActive: boolean = false;
let timeout: TimeoutID;
const showFor: number = 5000;

function getContainer(): HTMLElement {
    let $container: HTMLElement = querySelector(body, '#hit-feedback');
    if (!$container) {
        body.innerHTML += '<div id="hit-feedback" class="hit-notice-float"></div>';
        $container = querySelector(body, '#hit-feedback');
    }
    return $container;
}

function showFeedback(text: string, feedbackClass: 'message' | 'error' | 'warn' | 'success' = 'message'): void {

    const $container = getContainer();
    if (!$container) {
        return;
    }

    let delay: number = 0;
    if (isActive) {
        delay = 300;
        hideFeedback();
    }

    window.setTimeout(() => {
        const dismiss: string = '<button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button>';
        $container.innerHTML = `<div class="hit-notice hit-notice--${feedbackClass}"><p>${text}</p></div>${dismiss}`;
        $container.classList.add('hit-notice-float--visible');
        querySelector($container, 'button.notice-dismiss').onclick = e => {
            hideFeedback();
        };
        isActive = true;
        timeout = window.setTimeout(() => {
            hideFeedback();
        }, showFor);
    }, delay);
}

function hideFeedback() {
    const $container = getContainer();
    $container.classList.remove('hit-notice-float--visible');
    isActive = false;
    clearTimeout(timeout);
}

export const feedback: Function = (text, feedbackClass) => showFeedback(text, feedbackClass);
export const feedbackNotice: Function = text => showFeedback(text);
export const feedbackError: Function = text => showFeedback(text, 'error');
export const feedbackWarn: Function = text => showFeedback(text, 'warn');
export const feedbackSuccess: Function = text => showFeedback(text, 'success');


