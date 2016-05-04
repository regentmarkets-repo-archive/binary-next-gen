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

	static contextTypes = {
		router: React.PropTypes.object,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	onSelectForMobile() {
		const { router } = this.context;
		router.goBack();
	}

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
					onSelect={::this.onSelectForMobile}
					updateParams={::this.updateParamsForMobile}
				/>
			</MobilePage>
		);
	}
}
