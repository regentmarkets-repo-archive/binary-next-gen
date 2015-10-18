import React from 'react';
import { MobilePage } from '../common';
import WatchlistCard from './WatchlistCard';

export default (props) => (
	<MobilePage>
		<WatchlistCard compact={true} {...props} />
	</MobilePage>
);
