// @flow

import React from 'react';

type Props = {
    className: string
};

const LoaderSnippet = ({className}: Props) => {
    return <div className={className + ' hit-loader'}/>
};

export const Loader = LoaderSnippet;
export const LoaderContainer = ({className}: Props) => {
    return (
        <div className={className + ' hit-loader-container'}>
            <LoaderSnippet/>
        </div>
    );
};

LoaderSnippet.defaultProps = {
    className: ''
};

LoaderContainer.defaultProps = {
    className: ''
};