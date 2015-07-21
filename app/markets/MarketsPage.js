import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MarketsActions from '../_actions/MarketsActions';
import MarketsList from './MarketsList';
import MarketsSearch from './MarketsSearch';

@connect(state => ({
	markets: state.markets
}))
export default class MarketsPage extends React.Component {

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
