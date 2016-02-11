import React from 'react';
import MobilePage from '../containers/MobilePage';
import PortfolioContainer from './PortfolioContainer';

export default (props) => (
	<MobilePage>
		<PortfolioContainer compact {...props} />
	</MobilePage>
);
