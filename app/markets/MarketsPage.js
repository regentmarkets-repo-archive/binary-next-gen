import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MarketsActions from '../_actions/MarketsActions';
import MarketsList from './MarketsList';
import MarketsSearch from './MarketsSearch';
import LiveData from '../_data/LiveData';

@connect(state => ({ markets: state.markets }))
export default class MarketsPage extends React.Component {

	static propTypes = {
        markets: React.PropTypes.object,
		dispatch: React.PropTypes.func,
    };

	constructor(props) {
		super(props);

		const liveData = new LiveData();

		liveData.addDataHandler('activeSymbols', data => {
			this.updateMarketData(data);
		});
	}

	updateMarketData(data) {
		const actions = bindActionCreators(MarketsActions, this.props.dispatch);
		const parsed = data.map(m => ({
			id: m.symbol,
			name: m.display_name,
		}));
		actions.updateMarkets(parsed);
	}

	render() {
		const { markets, dispatch } = this.props;
		const actions = bindActionCreators(MarketsActions, dispatch);

		return (
			<div>
				<MarketsSearch actions={actions} />
  				<MarketsList markets={markets.shownMarkets} />
			</div>
		);
	}
}
