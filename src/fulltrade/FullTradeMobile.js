import React from 'react';
import MobilePage from '../containers/MobilePage';
import GenericTradeCard from './FullTradeCard';

export default (props) => (
	<MobilePage>
		<GenericTradeCard compact {...props} />
	</MobilePage>
);
