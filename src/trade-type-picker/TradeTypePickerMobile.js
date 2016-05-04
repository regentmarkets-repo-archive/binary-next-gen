import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import MobilePage from '../containers/MobilePage';
import TradeTypePicker from './TradeTypePicker';
import { mobileTradeTypePickerSelector } from './TradeTypePickerSelectors';

@connect(mobileTradeTypePickerSelector)
export default class TradeTypePickerMobile extends React.Component {
	static propTypes = {
		actions: React.PropTypes.object.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	updateParamsForMobile(params) {
		const { actions } = this.props;
		actions.updateMultipleTradeParams(0, params);
		actions.updatePriceProposalSubscription(0);
	}

	render() {
		return (
			<MobilePage toolbarShown={false} backBtnBarTitle="Trade Type">
				<TradeTypePicker
					{...immutableChildrenToJS(this.props)}
					updateParams={::this.updateParamsForMobile}
				/>
			</MobilePage>
		);
	}
}
