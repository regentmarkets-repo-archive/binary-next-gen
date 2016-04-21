import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import StatementCard from './StatementCard';
import statementSelectors from '../_selectors/StatementSelectors';

@connect(statementSelectors)
export default class StatementContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return <StatementCard {...this.props} />;
	}
}
