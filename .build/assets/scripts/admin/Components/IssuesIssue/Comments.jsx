// @flow

import React from 'react';
import {config, strings} from './../../vendor/plugin';
import type {IssuesIssueCommentsCompProps, IssuesIssueCommentsCompState} from './../../vendor/types';
import {fetchComments} from './../../vendor/api';

import {LoaderContainer} from './../Globals/Loader';

class Comments extends React.Component<IssuesIssueCommentsCompProps, IssuesIssueCommentsCompState> {
	static defaultProps = {
		className: '',
	};

	state = {
		comments: []
	};

	componentDidMount() {
		fetchComments(this.props.issue.iid).then(comments => this.setState({comments}));
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
									{comment.body}
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
						<textarea id="hit-edit-comment-body" className="hit-edit__textarea" name="body"/>
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
