import React from 'react';
import MobilePage from '../containers/MobilePage';
import SingleTradeContainer from './SingleTradeContainer';

export default (props) => (
	<MobilePage>
		<SingleTradeContainer compact {...props} />
	</MobilePage>
);
