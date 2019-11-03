// @flow

import React from 'react';
import {config, strings} from './../../vendor/plugin';
import type {IssueObject} from './../../vendor/types';
import {formatIssueAttributes} from './../../vendor/helpers';

export type props = {
	className?: string,
	issue: IssueObject,
};

export type state = {
	states: Object,
};

class Item extends React.Component<props, state> {
	static defaultProps = {
		className: '',
	};

	state = {
		states: config.issueAttributes.state,
	};

	render() {
		const issue = this.props.issue;
		return (
			<div className={`hit-issue-list hit-issue-list--${issue.state}`} data-state={this.state.states[issue.state]}>
				<h3 className="hit-issue-list__title">
					<a className="hit-issue-list__link" href={`#${issue.iid}`}>
						{issue.title}
					</a>
				</h3>
				<p className="hit-issue-list__hitlabels">
					{issue.type !== '' && (
						<span className={`hit-issue-label hit-issue-label--small hit-issue-label--type-${issue.type}`}>
							{strings('type')}: {formatIssueAttributes('type', issue.type)}
						</span>
					)}
					{issue.priority !== '' && (
						<span className={`hit-issue-label hit-issue-label--small hit-issue-label--priority-${issue.priority}`}>
							{strings('priority')}: {formatIssueAttributes('priority', issue.priority)}
						</span>
					)}
				</p>
				<span className="hit-issue-list__created">
					<b>#{issue.iid}</b> :: <b>{issue.authorLabel || issue.author}</b> :: {issue.date}
				</span>
				<span className="hit-issue-list__labels">
					{issue.labels.map(label => {
						return <span className="hit-issue-label hit-issue-label--small">{label}</span>;
					})}
				</span>
			</div>
		);
	}
}

export default Item;
