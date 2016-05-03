import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import MobilePage from '../containers/MobilePage';
import TradeTypePicker from './TradeTypePicker';

export default class TradeTypePickerMobile extends React.Component {
	
	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<MobilePage toolbarShown={false} backBtnBarTitle="Trade Type">
				<TradeTypePicker {...this.props} />
			</MobilePage>
		);
	}
}
