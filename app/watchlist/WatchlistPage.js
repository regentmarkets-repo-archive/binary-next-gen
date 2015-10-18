import React from 'react';
import { DesktopPage } from '../common';
import WatchlistCard from './WatchlistCard';

export default (props) => (
	<DesktopPage>
		<WatchlistCard {...props} />
	</DesktopPage>
);
