import {config, strings} from './../vendor/plugin';

class IssuesList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			states: config.issueAttributes.states,
			activeState: Object.keys(config.issueAttributes.states)[1]
		};
	}

	changeIssueStates(event) {
		console.log(event.target.value);
		this.setState({activeState: event.target.value});
	}

	render() {
		return (
			<div className={this.props.className + ' hit-issues'}>
				<div className="hit-issues__header">
					<form className="hit-issues__options">
						<div className="hit-issues__option">
							<label for="hit-issues-option-state">{strings('state')} ({this.state.activeState})</label>
							<select name="state" id="hit-issues-option-state" value={this.state.activeState} onChange={this.changeIssueStates}>
								{
									Object.keys(this.state.states).map(key => {
										console.log(key, this.state.states[key]);
										return <option value={key}>{this.state.states[key]}</option>;
									})
								}
							</select>
						</div>
					</form>
					<button className="hit-issues__add-issue button button-primary js-hit-create-issue">{strings('create-issue')}</button>
				</div>
			</div>
		)
	}
}

export default IssuesList;
