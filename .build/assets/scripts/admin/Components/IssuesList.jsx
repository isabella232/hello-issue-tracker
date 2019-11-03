// @flow

import React from 'react';
import {config, strings} from './../vendor/plugin';
import {LoaderContainer} from './Globals/Loader';
import {fetchIssues} from '../vendor/api';
import type {IssueObject} from './../vendor/types';

import Edit from './Edit';
import IssueListItem from './IssueList/Item';

export type props = {
	className?: string
};

export type state = {
	states: Object,
	activeState: string,
	issues: Array<IssueObject>,
	loading: boolean,
	newIssue: boolean,
};

class IssuesList extends React.Component<props, state> {
	static defaultProps = {
		className: '',
	};

	state = {
		states: config.issueAttributes.state,
		activeState: Object.keys(config.issueAttributes.state)[0],
		issues: [],
		loading: true,
		newIssue: false,
	};

	changeIssueStates = (event: SyntheticInputEvent<HTMLSelectElement>): void => {
		this.setState({
			activeState: event.target.value,
			issues: [],
		});
		this.loadIssues(event.target.value);
	};

	componentDidMount(): void {
		this.loadIssues(this.state.activeState);
		document.addEventListener('hit-list-reload', () => this.loadIssues(this.state.activeState));
		document.addEventListener('hit-list-closed', () => {
			this.loadIssues('closed');
			this.setState({activeState: 'closed'})
		});
		document.addEventListener('hit-list-opened', () => {
			this.loadIssues('opened');
			this.setState({activeState: 'opened'})
		});
	}

	loadIssues = async (state: string): any => fetchIssues({state}).then(issues => this.setState({
		issues,
		loading: false,
	}));

	render() {
		return (
			<div className={this.props.className + ' hit-issues'}>
				<div className="hit-issues__header">
					<form className="hit-issues__options">
						<div className="hit-issues__option">
							<label htmlFor="hit-issues-option-state">
								{strings('state')}
							</label>
							<select name="state" id="hit-issues-option-state" value={this.state.activeState} onChange={this.changeIssueStates}>
								{Object.keys(this.state.states).map(key => {
									return <option value={key}>{this.state.states[key]}</option>;
								})}
							</select>
						</div>
					</form>
					<button className="hit-issues__add-issue button button-primary js-hit-create-issue" onClick={() => this.setState({newIssue: true})}>
						{strings('create-issue')}
					</button>
				</div>
				{this.state.loading && <LoaderContainer className="hit-issues__loader"/>}
				<div className="hit-issues__list">
					{this.state.issues.map((issue: IssueObject) => {
						return <IssueListItem issue={issue}/>;
					})}
				</div>
				{this.state.newIssue && (
					<Edit close={(newIssue = {}) => {
						if (Object.keys(newIssue).length !== 0) {
							window.location.hash = newIssue.iid;
							const event = new CustomEvent('hit-list-reload');
							document.dispatchEvent(event);
						}
						this.setState({
							newIssue: false,
						})
					}}/>
				)}
			</div>
		)
	}
}

export default IssuesList;
