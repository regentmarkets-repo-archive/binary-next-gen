import React, { Component } from 'react';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import shouldPureComponentUpdate from 'react-pure-render/function';
import StatementCard from './StatementCard';
import statementSelectors from './statementSelectors';

@connect(statementSelectors)
export default class StatementContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return <StatementCard {...immutableChildrenToJS(this.props)} />;
	}
}
