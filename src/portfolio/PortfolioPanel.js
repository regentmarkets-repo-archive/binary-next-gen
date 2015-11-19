import React from 'react';
import { Panel } from '../_common';
import PortfolioContainer from './PortfolioContainer';

const PortfolioPanel = props => (
	<Panel title="Open Positions" position={props.position}>
		<PortfolioContainer {...props} />
	</Panel>
);

PortfolioPanel.propTypes = {
	position: React.PropTypes.object,
};

export default PortfolioPanel;
