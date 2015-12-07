import React from 'react';
import { MobilePage } from '../_common';
import WatchlistContainer from './WatchlistContainer';

export default (props) => (
	<MobilePage>
		<WatchlistContainer compact {...props} />
	</MobilePage>
);
