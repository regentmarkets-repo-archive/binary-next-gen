import React from 'react';
import MobilePage from '../containers/MobilePage';
import BaseTradeCard from './FullTradeCard';

export default (props) => (
	<MobilePage>
		<BaseTradeCard compact {...props} />
	</MobilePage>
);
