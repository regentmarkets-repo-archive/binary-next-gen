import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MarketsActions from '../_actions/MarketsActions';
import MarketsList from './MarketsList';
import MarketsSearch from './MarketsSearch';
import { LiveData } from 'binary-live-api';

@connect(state => ({
	markets: state.markets
}))
export default class MarketsPage extends React.Component {

	constructor(props) {
		super(props);

		LiveData.on('message', (data) => {

			if (!data.active_symbols) return;

			const { markets, dispatch } = this.props;
			const actions = bindActionCreators(MarketsActions, dispatch);
			const parsed = Object.keys(data.active_symbols).map(m => ({
				id: data.active_symbols[m].symbol,
				name: data.active_symbols[m].display_name
			}));
			actions.updateMarkets(parsed);
		});

		LiveData.init('1C8FsTiUegCGq2ZqM8ntMdHsUUQNE9grp5p9gD6VmSmyocfcJiS0n2uOM83kakaYZMRfFCbZGI6kzfu0lYkHHoYFpMJRKKVaVHe0Ezs1KqL6JZvMwNqAUFxLfulKoalD');
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
