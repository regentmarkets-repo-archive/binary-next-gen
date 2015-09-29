import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MarketsActions from '../_actions/MarketsActions';
import MarketsList from './MarketsList';
import MarketsSearch from './MarketsSearch';

@connect(state => ({ markets: state.markets }))
export default class MarketsPane extends React.Component {

	static propTypes = {
        markets: React.PropTypes.object,
		dispatch: React.PropTypes.func,
    };

	updateMarketData(data) {
		const actions = bindActionCreators(MarketsActions, this.props.dispatch);
		const parsed = data.map(m => ({
			id: m.symbol,
			name: m.display_name,
		}));
		actions.updateMarkets(parsed);
	}

	render() {
		const { dispatch } = this.props;
		const { shownMarkets } = this.props.markets.toJS(); // tree, active, shownMarkets, query
		const actions = bindActionCreators(MarketsActions, dispatch);

		return (
			<div>
				<MarketsSearch actions={actions} />
  				<MarketsList markets={shownMarkets} />
			</div>
		);
	}
}
