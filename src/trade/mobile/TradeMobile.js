import React from 'react';
import MobilePage from '../../containers/MobilePage';
import TradeXCardContainer from '../TradeXCardContainer';

export default (props) => (
	<MobilePage>
		<TradeXCardContainer {...props} compact index={0} />
	</MobilePage>
);
