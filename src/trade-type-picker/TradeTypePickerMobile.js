import React from 'react';
import { MobilePage } from '../_common';
import TradeTypePickerContainer from './TradeTypePickerContainer';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Trade Type">
		<TradeTypePickerContainer {...props} />
	</MobilePage>
);
