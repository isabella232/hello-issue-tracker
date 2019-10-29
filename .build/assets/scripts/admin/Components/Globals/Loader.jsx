// @flow

import React from 'react';

type Props = {
	className?: string
};

export const Loader = ({className}: Props) => {
	return <div className={className + ' hit-loader'}/>
};

//export const Loader = LoaderSnippet;
export const LoaderContainer = ({className}: Props) => {
	return (
		<div className={className + ' hit-loader-container'}>
			<Loader/>
		</div>
	);
};

Loader.defaultProps = {
	className: ''
};

LoaderContainer.defaultProps = {
	className: ''
};
