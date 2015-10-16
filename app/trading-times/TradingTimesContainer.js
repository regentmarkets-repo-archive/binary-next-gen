import React from 'react';
import { connect } from 'react-redux';
import TradingTimesCard from './TradingTimesCard';

@connect(state => ({ assets: state.assets, tradingTimesWorkspace: state.workspace.get('tradingTimes') }))
export default class TradingTimesContainer extends React.Component {

	static propTypes = {
		assets: React.PropTypes.object.isRequired,
		tradingTimesWorkspace: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			<TradingTimesCard {...this.props} />
		);
	}
}
