import React from 'react';
import { DesktopPage } from '../_common';
import WatchlistContainer from './WatchlistContainer';

export default (props) => (
	<DesktopPage>
		<WatchlistContainer {...props} />
	</DesktopPage>
);
