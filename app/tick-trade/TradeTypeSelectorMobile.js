import React from 'react';
import { MobilePage } from '../_common';
import TradeTypeSelector from './TradeTypeSelector';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Select Trade Type">
		<TradeTypeSelector {...props} />
	</MobilePage>
);
