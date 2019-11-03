// @flow

import React from 'react';
import {config, strings} from './../vendor/plugin';
import type {IssueObject} from './../vendor/types';
import {fetchIssues, updateIssue} from './../vendor/api';
import {formatIssueAttributes, prepareIssueForApi, prepareIssueForList} from '../vendor/helpers';

import Edit from './Edit';
import {LoaderContainer} from './Globals/Loader';
import Comments from './IssuesIssue/Comments';

export type props = {
	className?: string
};
export type state = {
	issueId: number,
	issue: IssueObject,
	editIssue: boolean,
	closeLoading: boolean,
};

class IssuesIssue extends React.Component<props, state> {

	static defaultProps = {
		className: '',
	};

	state = {
		issueId: parseInt(window.location.hash.replace('#', '')) || 0,
		issue: {},
		editIssue: false,
		closeLoading: false,
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

	closeIssue = async () => {

		if (!confirm(strings('issue-should-close'))) {
			return;
		}

		this.setState({
			closeLoading: true,
		});
		let issue = {...this.state.issue};
		issue.state = 'closed';
		issue.state_event = 'close';
		issue = prepareIssueForApi(issue);
		const iid = issue.iid;
		const response = await updateIssue(iid, issue);
		let data = await response.json();

		if (data.error) {
			// Error!
			alert(data.error);
			this.setState({
				closeLoading: false,
			});
			return;
		}

		const event = new CustomEvent('hit-list-closed');
		document.dispatchEvent(event);

		this.setState({
			issue: prepareIssueForList(data),
			closeLoading: false,
		});
	};

	render() {
		if (this.state.issueId === 0) {
			return '';
		}

		if (Object.keys(this.state.issue).length === 0) {
			return <LoaderContainer className={this.props.className}/>;
		}

		const issue = this.state.issue;

		return (
			<div className={this.props.className + ' hit-issue'}>
				<header className="hit-issue__header">
					<span className="hit-issue__created">
						<b>{issue.authorLabel || issue.author}</b> / {issue.date}
					</span>
					{(issue.state === 'opened') && (
						<button className="button button--close" onClick={() => this.closeIssue()} disabled={this.state.closeLoading}>
							{strings('close-issue')}
						</button>
					)}
					{(issue.state === 'opened') && (
						<button className="button button-primary" data-iid={issue.iid} onClick={() => this.setState({editIssue: true})}>
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
				{this.state.editIssue && (
					<Edit
						close={(issue = {}) => {
							let setIssue = this.state.issue;
							if (Object.keys(issue).length !== 0) {
								const event = new CustomEvent('hit-list-reload');
								document.dispatchEvent(event);
								setIssue = issue;
							}
							this.setState({
								editIssue: false,
								issue: setIssue,
							})
						}}
						issue={issue}
					/>
				)}
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
