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

		liveData.onDataChange = (data) => {
			this.state = { activeSymbols: liveData.activeSymbols };

			if (data !== 'active_symbols') return;

			const { dispatch } = this.props;
			const actions = bindActionCreators(MarketsActions, dispatch);
			const parsed = Object.keys(data.active_symbols).map(m => ({
				id: data.active_symbols[m].symbol,
				name: data.active_symbols[m].display_name,
			}));
			actions.updateMarkets(parsed);
		};
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
