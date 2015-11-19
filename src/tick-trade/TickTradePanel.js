import React from 'react';
import { Panel } from '../_common';
import TickTradeContainer from './TickTradeContainer';

const TickTradePanel = props => (
	<Panel title="Tick Trade" position={props.position}>
		<TickTradeContainer {...props} />
	</Panel>
);

TickTradePanel.propTypes = {
	position: React.propTypes.object,
};

export default TickTradePanel;
