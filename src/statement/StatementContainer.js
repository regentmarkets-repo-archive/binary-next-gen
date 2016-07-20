import React, { Component } from 'react';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import StatementCard from './StatementCard';
import statementSelectors from './statementSelectors';

@connect(statementSelectors)
export default class StatementContainer extends Component {

	render() {
		return <StatementCard {...immutableChildrenToJS(this.props)} />;
	}
}
