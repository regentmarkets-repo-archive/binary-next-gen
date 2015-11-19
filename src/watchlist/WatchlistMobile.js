import React from 'react';
import { MobilePage } from '../_common';
import WatchlistCard from './WatchlistCard';

export default (props) => (
	<MobilePage>
		<WatchlistCard compact {...props} />
	</MobilePage>
);
