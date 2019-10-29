// @flow

import React from 'react';
import {config, strings} from './../vendor/plugin';
import type {IssuesIssueCompState, IssuesIssueCompProps} from './../vendor/types';
import {fetchIssues} from './../vendor/api';
import {formatIssueAttributes} from '../vendor/helpers';

import {LoaderContainer} from './Globals/Loader';
import Comments from './IssuesIssue/Comments';

class IssuesIssue extends React.Component<IssuesIssueCompProps, IssuesIssueCompState> {

	static defaultProps = {
		className: '',
	};

	state = {
		issueId: parseInt(window.location.hash.replace('#', '')) || 0,
		issue: {},
	};

	componentDidMount() {
		window.onhashchange = () => {
			this.setState({
				issueId: parseInt(window.location.hash.replace('#', '')) || 0,
			});
		};

		this.loadIssue(parseInt(window.location.hash.replace('#', '')) || 0);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.issueId !== prevState.issueId) {
			this.loadIssue(this.state.issueId);
		}
	}

	loadIssue(issueId: number) {
		this.setState({issue: {}});
		fetchIssues({}, issueId).then(issues => this.setState({issue: issues[0]}));
	}

	render() {
		if (this.state.issueId === 0) {
			return '';
		}

		if (Object.keys(this.state.issue).length === 0) {
			return <LoaderContainer className={this.props.className}/>;
		}

		const issue = this.state.issue;
		//console.log(issue);

		return (
			<div className={this.props.className + ' hit-issue'}>
				<header className="hit-issue__header">
					<span className="hit-issue__created">
						<b>{issue.author}</b> / {issue.date}
					</span>
					{(issue.state === 'opened') && (
						<button className="button button--close" data-iid={issue.iid}>
							{strings('close-issue')}
						</button>
					)}
					{(issue.state === 'opened') && (
						<button className="button button-primary" data-iid={issue.iid}>
							{strings('edit-issue')}
						</button>
					)}
					{issue.state === 'closed' && (
						<span className="hit-issue-label hit-issue-label--big hit-issue-label--color-green">
							{issue.state}
						</span>
					)}
				</header>
				<div className="hit-issue__status">
					{strings('type')}:
					<span className={`hit-issue-label hit-issue-label--type-${issue.type}`}>
						{formatIssueAttributes('type', issue.type)}
					</span>
					{strings('priority')}:
					<span className={`hit-issue-label hit-issue-label--priority-${issue.priority}`}>
						{formatIssueAttributes('priority', issue.priority)}
					</span>
				</div>
				<h2 className="hit-issue__title">{issue.title}</h2>
				<div className="hit-issue__subtitle">
					<span className="hit-issue__labels">
						{issue.labels.map(label => {
							return <span className="hit-issue-label hit-issue-label--small">{label}</span>;
						})}
					</span>
				</div>
				<div className="hit-issue__description" dangerouslySetInnerHTML={{__html: issue.description}}/>
				<Comments className="hit-issue__comments" issue={issue}/>
			</div>
		);

		/*
		return (
			<div className={this.props.className + ' hit-issue'}>
				<header className="hit-issue__header">
					<span className="hit-issue__created"><b>${author}</b> / ${date}</span>
					${(issue.state === 'opened' ? `<button class="button button--close js-hit-close-issue" data-iid="${issue.iid}">Close Issue</button><button class="button button-primary js-hit-edit-issue" data-iid="${issue.iid}">Edit Issue</button>` : `<span class="hit-issue-label hit-issue-label--big hit-issue-label--color-green">${state}</span>`)}
				</header>
				<div className="hit-issue__status">
					Type: <span className="hit-issue-label hit-issue-label--type-${issue.hit_label.type}">${type}</span>
					Priority: <span className="hit-issue-label hit-issue-label--prio-${issue.hit_label.priority}">${priority}</span>
				</div>
				<h2 className="hit-issue__title">${issue.title}</h2>
				<div className="hit-issue__subtitle">
					<span className="hit-issue__labels">${issue.labels.map(label => `<span class="hit-issue-label hit-issue-label--small">${label}</span>`).join(' ')}</span>
				</div>
				<div className="hit-issue__description">${description}</div>
				<div className="hit-issue__comments hit-comments">
					<ul className="hit-comments__list"></ul>
					<form action="" className="hit-comments__form hit-edit js-hit-new-comment-form">
						<input type="hidden" name="iid" value="${issue.iid || 'new'}"/>
						<div className="hit-edit__element">
							<p><b>Add new comment</b></p>
						</div>
						<div className="hit-edit__element">
							<textarea id="hit-edit-comment-body" className="hit-edit__textarea" name="body"></textarea>
						</div>
						<div className="hit-edit__element hit-edit__element--controls">
							<button type="submit" className="button button-primary">${'Add comment'}</button>
						</div>
					</form>
					<div className="hit-comments__loader hit-loader hit-loader--gray hit-loader--small"></div>
				</div>
			</div>
		);
		 */
	}
}

export default IssuesIssue;
