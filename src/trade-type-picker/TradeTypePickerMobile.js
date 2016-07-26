import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import { actions } from '../_store';
import MobilePage from '../containers/MobilePage';
import TradeTypePicker from './TradeTypePicker';
import { mobileTradeTypePickerSelector } from '../trade/mobile/singleTradeSelectors';

@connect(mobileTradeTypePickerSelector)
export default class TradeTypePickerMobile extends PureComponent {

	static contextTypes = {
		router: PropTypes.object,
	};

	onSelectForMobile = () => {
		const { router } = this.context;
		router.goBack();
	}

	updateParamsForMobile = params => {
		actions.updateMultipleTradeParams(0, params);
		actions.updatePriceProposalSubscription(0);
	}

	clearTradeError = () => {
		actions.updateTradeError(0, 'barrierError', undefined);
		actions.updateTradeError(0, 'durationError', undefined);
		actions.updateTradeError(0, 'proposalError', undefined);
		actions.updateTradeError(0, 'purchaseError', undefined);
	}

	render() {
		const { contract, params } = immutableChildrenToJS(this.props);

		if (!contract) return null;

		return (
			<MobilePage toolbarShown={false} backBtnBarTitle="Trade Type">
				<TradeTypePicker
					contract={contract}
					tradeParams={params}
					onSelect={this.onSelectForMobile}
					updateParams={this.updateParamsForMobile}
					clearTradeError={this.clearTradeError}
				/>
			</MobilePage>
		);
	}
}
