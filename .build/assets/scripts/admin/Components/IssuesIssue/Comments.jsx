// @flow

import React from 'react';
import {config, strings} from './../../vendor/plugin';
import {html2md} from './../../vendor/showdown';
import {createComment} from './../../vendor/api';
import type {CommentObject, IssueObject} from './../../vendor/types';
import {fetchComments} from './../../vendor/api';

import {Editor} from './../Globals/Editor';
import {LoaderContainer} from './../Globals/Loader';

export type props = {
	className?: string,
	issue: IssueObject,
};
export type state = {
	comments: Array<CommentObject>,
	newComment: string,
	newCommentLoading: boolean,
	loading: boolean,
};

class Comments extends React.Component<props, state> {
	static defaultProps = {
		className: '',
	};

	state = {
		comments: [],
		newComment: '',
		newCommentLoading: false,
		loading: true,
	};

	componentDidMount() {
		fetchComments(this.props.issue.iid).then(comments => this.setState({
			comments,
			loading: false,
		}));
	}

	submit = (e) => {
		e.preventDefault();
		let comment = this.state.newComment;
		comment += `<p>${config.labelPrefix}author: ${config.user}</p>`;
		comment = html2md(comment);
		this.setState({
			newCommentLoading: true,
		});
		createComment(this.props.issue.iid, comment)
			.then(r => {
				fetchComments(this.props.issue.iid).then(comments => this.setState({
					comments,
					newCommentLoading: false,
					newComment: '',
				}));
			})
			.catch(r => {
				console.log(r);
			});
	};

	render() {
		return (
			<div className="hit-comments">
				{this.state.loading && (
					<LoaderContainer/>
				)}
				{(this.state.comments.length !== 0) && (
					<ul className="hit-comments__list">
						{this.state.comments.map(comment => {
							return (
								<li className="hit-comments__comment-item">
									<div className="hit-comments__comment-content" dangerouslySetInnerHTML={{__html: comment.body}}/>
									<span className="hit-comments__comment-meta">
										<b>{comment.author}</b> / {comment.date}
									</span>
								</li>
							);
						})}
					</ul>
				)}
				<form className="hit-comments__form" onSubmit={this.submit}>
					<h2 className="hit-comments__form-title">
						{strings('add-new-comment')}
					</h2>
					<Editor value={this.state.newComment} onChange={val => this.setState({newComment: val})} plugins={['autoresize']}/>
					<div className="hit-comments__form-controls">
						<button type="submit" className="button button-primary" disabled={this.state.newCommentLoading}>
							{strings('add-comment')}
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Comments;
