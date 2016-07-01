import React from 'react';
import MobilePage from '../containers/MobilePage';
import TradeXCardContainer from './test/TradeXCardContainer';

export default (props) => (
	<MobilePage>
		<TradeXCardContainer {...props} compact index={0} />
	</MobilePage>
);
