import React from 'react';
import { connect } from 'react-redux';
import TradingTimesPane from './TradingTimesPane';

@connect(state => ({ assets: state.assets }))
export default class TradingTimesContainer extends React.Component {

	static propTypes = {
		params: React.PropTypes.object.isRequired,
		assets: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			<TradingTimesPane {...this.props} />
		);
	}
}
