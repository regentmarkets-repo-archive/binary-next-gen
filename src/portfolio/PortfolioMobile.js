import React from 'react';
import MobilePage from '../mobile/MobilePage';
import PortfolioContainer from './PortfolioContainer';

export default (props) => (
	<MobilePage>
		<PortfolioContainer compact {...props} />
	</MobilePage>
);
