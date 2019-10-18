// @flow

import React from 'react';
import {config, strings} from './../vendor/plugin'
import {LoaderContainer} from "./Globals/Loader";

type Props = {
    className: string
};

type State = {
    states: Object,
    activeState: string
};

class IssuesList extends React.Component<Props, State> {
    static defaultProps = {
        className: '',
    };

    state = {
        states: config.issueAttributes.states,
        activeState: Object.keys(config.issueAttributes.states)[1]
    };

    /*
    constructor() {
        this.changeIssueStates = this.changeIssueStates.bind(this);
    }

    changeIssueStates(event) {
        this.setState({
            activeState: event.target.value
        });
    }
    */

    render() {
        return (
            <div className={this.props.className + ' hit-issues'}>
                <div className="hit-issues__header">
                    <form className="hit-issues__options">
                        <div className="hit-issues__option">
                            <label for="hit-issues-option-state">{strings('state')}</label>
                            <select name="state" id="hit-issues-option-state" value={this.state.activeState} onChange={this.changeIssueStates}>
                                {
                                    Object.keys(this.state.states).map(key => {
                                        return <option value={key}>{this.state.states[key]}</option>;
                                    })
                                }
                            </select>
                        </div>
                    </form>
                    <button className="hit-issues__add-issue button button-primary js-hit-create-issue">{strings('create-issue')}</button>
                </div>
                <div className="hit-issues__head hit-issue-list">
                    <div className="hit-issue-list__item">{strings('id')}</div>
                    <div className="hit-issue-list__item">{strings('title')}</div>
                    <div className="hit-issue-list__item">{strings('type')}</div>
                    <div className="hit-issue-list__item">{strings('priority')}</div>
                </div>
                <LoaderContainer className="hit-issues__loader"/>
                <div className="hit-issues__list"/>
            </div>
        )
    }
}

export default IssuesList;
