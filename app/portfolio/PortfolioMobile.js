import React from 'react';
import { MobilePage } from '../_common';
import PortfolioContainer from './PortfolioContainer';

export default (props) => (
	<MobilePage>
		<PortfolioContainer compact={true} {...props} />
	</MobilePage>
);
