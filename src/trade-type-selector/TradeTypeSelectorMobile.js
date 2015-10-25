import React from 'react';
import { MobilePage } from '../_common';
import TradeTypeSelectorContainer from './TradeTypeSelectorContainer';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Select Trade Type">
		<TradeTypeSelectorContainer {...props} />
	</MobilePage>
);
