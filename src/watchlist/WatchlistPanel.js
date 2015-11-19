import React from 'react';
import { Panel } from '../_common';
import WatchlistCard from './WatchlistCard';

const WatchlistPanel = props => (
	<Panel title="Watchlist" position={props.position}>
		<WatchlistCard {...props} />
	</Panel>
);

WatchlistPanel.propTypes = {
	position: React.propTypes.object,
};

export default WatchlistPanel;
