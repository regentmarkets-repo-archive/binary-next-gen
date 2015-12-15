import React from 'react';
import { connect } from 'react-redux';
import StatementCard from './StatementCard';
import shouldPureComponentUpdate from 'react-pure-render/function';

@connect(state => ({ statement: state.statement, account: state.account }))
export default class StatementContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return <StatementCard {...this.props} />;
	}
}
