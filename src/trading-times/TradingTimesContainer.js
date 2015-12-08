import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TradingTimesCard from './TradingTimesCard';

@connect(state => ({ assets: state.assets, tradingTimesFilter: state.workspace.get('tradingTimes') }))
export default class TradingTimesContainer extends React.Component {

	static propTypes = {
		assets: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired,
		tradingTimesFilter: PropTypes.object.isRequired,
	};

	render() {
		return (
			<TradingTimesCard {...this.props} />
		);
	}
}
