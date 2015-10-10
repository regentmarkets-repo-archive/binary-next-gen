import React from 'react';
import { Popup } from '../common';
import PortfolioContainer from './PortfolioContainer';

export default (props) => (
	<Popup shown={true}>
		<PortfolioContainer {...props} />
	</Popup>
);
