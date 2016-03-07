import React from 'react';
import MobilePage from '../containers/MobilePage';
import FullTradeCard from './FullTradeCard';

export default (props) => (
	<MobilePage>
		<FullTradeCard compact {...props} />
	</MobilePage>
);
