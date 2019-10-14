import {config, strings} from './vendor/plugin';
import IssuesList from './Components/IssuesList.jsx';
import IssuesIssue from './Components/IssuesIssue.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (config.gitlab.repoUrl === '') {
			return (
				<div className="hit-page">
					<div className="hit-notice hit-notice--error">
						<p>{strings('repo-url-not-set')}</p>
					</div>
				</div>
			);
		}

		return (
			<div className="hit-page">
				<IssuesList className="hit-page__side"/>
				<IssuesIssue className="hit-page__main"/>
			</div>
		);
	}
}

export default App;
