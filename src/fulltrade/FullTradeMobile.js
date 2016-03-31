import React from 'react';
import MobilePage from '../containers/MobilePage';
import FullTradeContainer from './FullTradeContainer';

export default (props) => (
	<MobilePage>
		<FullTradeContainer compact {...props} />
	</MobilePage>
);
