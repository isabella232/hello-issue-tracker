// @flow

import React from 'react';
import {config} from "../vendor/plugin";

type Props = {
    className: string
};

class IssuesIssue extends React.Component<Props> {
    static defaultProps = {
        className: '',
    };

    render() {
        return <div className={this.props.className}>issue</div>
    }
}

export default IssuesIssue;
