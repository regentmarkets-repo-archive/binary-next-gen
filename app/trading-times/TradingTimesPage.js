import React from 'react';
import { connect } from 'react-redux';
import SegmentedControl from '../common/SegmentedControl';
import TradingTimesTable from './TradingTimesTable';

@connect(state => ({ tradingTimes: state.serverData.tradingTimes }))
export default class TradingTimesPage extends React.Component {

	static propTypes = {
		params: React.PropTypes.object.isRequired,
		tradingTimes: React.PropTypes.array.isRequired,
	};

	static defaultProps = {
		tradingTimes: [],
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { tradingTimes, params } = this.props;

		const marketLinks = tradingTimes.map(x => ({
			href: '/trading-times/' + x.name.toLowerCase(),
			text: x.name,
		}));

		const marketFromRoute = tradingTimes.find(x => x.name.toLowerCase() === params.market.toLowerCase());
		const marketSelected = marketFromRoute || { submarkets: [] };

		return (
			<div>
				<SegmentedControl segments={marketLinks} />
				{marketSelected.submarkets.map((s, i) => <TradingTimesTable key={i} submarket={s} />) }
			</div>
		);
	}
}
