import React from 'react';
import MobilePage from '../../containers/MobilePage';
import TradeCardContainer from '../TradeCardContainer';
import IosPadder from './IosPadder';

export default (props) => (
	<MobilePage>
		<TradeCardContainer {...props} compact index={0} />
		<IosPadder />
	</MobilePage>
);
