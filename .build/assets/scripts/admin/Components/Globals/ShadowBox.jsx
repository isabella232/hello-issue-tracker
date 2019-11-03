// @flow

import React from 'react';
import type {Node} from 'react';
import ReactDOM from 'react-dom';


const Portal = ({children}) => {
	return ReactDOM.createPortal(
		children,
		document.querySelector('#hello-issue-tracker-shadowbox')
	);
};

export default (props: {
	close: Function,
	children: Node,
}) => {
	return (
		<Portal>
			<div className="hit-shadowbox">
				<div className="hit-shadowbox__shadow" onClick={props.close}/>
				<div className="hit-shadowbox__box">
					<button className="hit-shadowbox__close" onClick={props.close}>Close</button>
					<div className="hit-shadowbox__content">
						{props.children}
					</div>
				</div>
			</div>
		</Portal>
	)
};
