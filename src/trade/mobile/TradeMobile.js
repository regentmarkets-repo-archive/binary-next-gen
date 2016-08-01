import React, { PureComponent } from 'react';
import MobilePage from '../../containers/MobilePage';
import TradeCardContainer from '../TradeCardContainer';
import { actions } from '../../_store';

export default class TradeMobile extends PureComponent {
	componentWillMount() {
		actions.changeActiveLayout(1, 1);
	}

	render() {
		return (
			<MobilePage>
				<TradeCardContainer {...this.props} compact index={0} />
			</MobilePage>
		);
	}
}
