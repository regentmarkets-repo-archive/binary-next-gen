import React from 'react';
import { Panel } from '../_common';
import WatchlistContainer from './WatchlistContainer';

const WatchlistPanel = props => (
	<Panel title="Watchlist" position={props.position}>
		<WatchlistContainer {...props} />
	</Panel>
);

WatchlistPanel.propTypes = {
	position: React.PropTypes.object,
};

export default WatchlistPanel;
