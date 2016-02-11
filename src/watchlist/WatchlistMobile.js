import React from 'react';
import MobilePage from '../containers/MobilePage';
import WatchlistContainer from './WatchlistContainer';

export default (props) => (
	<MobilePage>
		<WatchlistContainer compact {...props} />
	</MobilePage>
);
