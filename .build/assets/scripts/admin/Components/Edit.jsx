// @flow

import React from 'react';

import {config, strings} from './../vendor/plugin';
import type {IssueObject} from './../vendor/types';
import {prepareIssue} from './../vendor/helpers';

import {Editor} from './Globals/Editor';
import ShadowBox from './Globals/ShadowBox';
import {createIssue, updateIssue} from './../vendor/api';

type props = {
	issue: IssueObject,
	close: Function,
};

type state = {
	issue: IssueObject,
	loading: boolean,
};

class Edit extends React.Component<props, state> {

	static defaultProps = {
		issue: {
			iid: 0,
			title: '',
			description: '',
			hitLabels: {
				priority: Object.keys(config.issueAttributes.priority)[0],
				type: Object.keys(config.issueAttributes.type)[0],
			}
		},
	};

	state = {
		issue: this.props.issue,
		loading: false,
	};

	updateIssue = (key, value) => {

		const newIssue = {...this.state.issue};
		newIssue[key] = value;

		this.setState({
			issue: newIssue,
		})
	};

	updateHitLabel = (key, value) => {
		const newLabels = {...this.state.issue.hitLabels};
		newLabels[key] = value;

		this.updateIssue('hitLabels', newLabels);
	};

	submit = async e => {
		e.preventDefault();
		this.setState({loading: true});
		const issue = prepareIssue(this.state.issue);
		const iid = issue.iid;

		const isNew = iid === 0;
		let response;

		if (isNew) {
			delete issue.iid;
			response = await createIssue(issue);
		} else {
			response = await updateIssue(iid, issue);
		}

		let data = await response.json();
		this.setState({loading: false});

		if (data.error) {
			// Error!
			alert(data.error);
			return;
		}
		console.log(data);

		/*
		if (request.status >= 300) {
			// Error!
			alert('Error: Issue could not be saved');
			return;
		}

		this.state.close;
		console.log(request);

		 */
	};

	render() {
		const issue = this.state.issue;
		return (
			<ShadowBox close={this.props.close}>
				<form className="hit-edit js-hit-edit-form" onSubmit={this.submit}>
					<div className="hit-edit__element">
						<label htmlFor="hit-edit-title" className="hit-edit__label">{strings('title')}</label>
						<input
							id="hit-edit-title"
							className="hit-edit__input"
							name="title"
							value={issue.title}
							type="text"
							onChange={e => this.updateIssue('title', e.target.value)}
						/>
					</div>
					<div className="hit-edit__element">
						<Editor
							onChange={desc => this.updateIssue('description', desc)}
							value={issue.description}
						/>
					</div>
					<div className="hit-edit__element">
						<label htmlFor="hit-edit-priority" className="hit-edit__label">{strings('priority')}</label>
						<select
							id="hit-edit-priority"
							className="hit-edit__input"
							name="priority"
							value={issue.hitLabels.priority}
							onChange={e => this.updateHitLabel('priority', e.target.value)}
						>
							{Object.keys(config.issueAttributes.priority).map(key => {
								return <option value={key}>{config.issueAttributes.priority[key]}</option>;
							})}
						</select>
					</div>
					<div className="hit-edit__element">
						<label htmlFor="hit-edit-type" className="hit-edit__label">{strings('type')}</label>
						<select
							id="hit-edit-type"
							className="hit-edit__input"
							name="type"
							value={issue.hitLabels.type}
							onChange={e => this.updateHitLabel('type', e.target.value)}
						>
							{Object.keys(config.issueAttributes.type).map(key => {
								return <option value={key}>{config.issueAttributes.type[key]}</option>;
							})}
						</select>
					</div>
					<div className="hit-edit__element hit-edit__element--controls">
						<button type="submit" className="button button-primary" disabled={this.state.loading}>
							{(issue.iid === 0 ? strings('create-issue') : strings('update-issue'))}
						</button>
					</div>
				</form>
			</ShadowBox>
		);
	}
}

export default Edit;
