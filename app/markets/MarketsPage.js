import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MarketsActions from '../_actions/MarketsActions';
import MarketsList from './MarketsList';
import MarketsSearch from './MarketsSearch';
import { LiveData } from 'binary-live-api';

@connect(state => ({ markets: state.markets }))
export default class MarketsPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('fcR6ZySPS3u0ezqOEt0bCZqpAuvXejg0vRUtulSAaCDISBPlrWtjOiIK1u8ZhGf0D8fJVWi4Zepb35jwAD6IpE7JF3gyFpT0BD6aH8Q7xIhb4FNKqasHWySW1pRJBI7T')

		liveData.onDataChange = (function(data) {
			this.state = { activeSymbols: liveData.activeSymbols };

			if (data != 'active_symbols') return;

			const { markets, dispatch } = this.props;
			const actions = bindActionCreators(MarketsActions, dispatch);
			const parsed = Object.keys(data.active_symbols).map(m => ({
				id: data.active_symbols[m].symbol,
				name: data.active_symbols[m].display_name
			}));
			actions.updateMarkets(parsed);
		}).bind(this);
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
