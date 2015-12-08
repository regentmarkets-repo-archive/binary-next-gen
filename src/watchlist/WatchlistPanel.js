import React, { PropTypes } from 'react';
import { Panel } from '../_common';
import WatchlistContainer from './WatchlistContainer';

const WatchlistPanel = props => (
	<Panel title="Watchlist" position={props.position}>
		<WatchlistContainer {...props} />
	</Panel>
);

WatchlistPanel.propTypes = {
	position: PropTypes.object,
};

export default WatchlistPanel;
