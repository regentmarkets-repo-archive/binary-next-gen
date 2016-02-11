import React from 'react';
import MobilePage from '../containers/MobilePage';
import TradePanel from './TradePanel';

export default (props) => (
	<MobilePage>
		<TradePanel compact {...props} />
	</MobilePage>
);
