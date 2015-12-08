import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import StatementCard from './StatementCard';

@connect(state => ({ statement: state.statement, account: state.account }))
export default class StatementContainer extends React.Component {

	static propTypes = {
		profitTable: PropTypes.object,
		dispatch: PropTypes.func,
	};

	render() {
		return <StatementCard {...this.props} />;
	}
}
