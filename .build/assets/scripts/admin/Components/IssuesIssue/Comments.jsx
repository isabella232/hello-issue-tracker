// @flow

import React from 'react';
import {config, strings} from './../../vendor/plugin';
import type {IssuesIssueCommentsCompProps, IssuesIssueCommentsCompState} from './../../vendor/types';
import {fetchComments} from './../../vendor/api';

import {Editor} from './../Globals/Editor';
import {LoaderContainer} from './../Globals/Loader';

class Comments extends React.Component<IssuesIssueCommentsCompProps, IssuesIssueCommentsCompState> {
	static defaultProps = {
		className: '',
	};

	state = {
		comments: [],
		newComment: '',
	};

	componentDidMount() {
		console.log('mounted');
		fetchComments(this.props.issue.iid).then(comments => this.setState({comments}));
	}

	componentDidUpdate() {
		console.log('updated');
		console.log(document.querySelector('#hit-edit-comment-body'));
	}

	render() {
		return (
			<div className="hit-comments">
				{(this.state.comments.length === 0) && (
					<LoaderContainer/>
				)}
				{(this.state.comments.length !== 0) && (
					<ul className="hit-comments__list">
						{this.state.comments.map(comment => {
							console.log(comment);
							return (
								<li className="hit-comments__comment-item">
									<div dangerouslySetInnerHTML={{__html: comment.body}}/>
									<span className="hit-comments__comment-meta">
										<b>{comment.author}</b> / {comment.date}
									</span>
								</li>
							);
						})}
					</ul>
				)}
				<form action="" className="hit-comments__form hit-edit">
					<input type="hidden" name="iid" value="${issue.iid || 'new'}"/>
					<div className="hit-edit__element">
						<p><b>{strings('add-new-comment')}</b></p>
					</div>
					<div className="hit-edit__element">
						<Editor value={this.state.newComment} onChange={val => this.setState({newComment: val})}/>
					</div>
					<div className="hit-edit__element hit-edit__element--controls">
						<button type="submit" className="button button-primary">
							{strings('add-comment')}
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Comments;
