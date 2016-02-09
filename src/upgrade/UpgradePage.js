import React from 'react';
import MobilePage from '../mobile/MobilePage';
import UpgradeContainer from './UpgradeContainer';

export default (props) => (
	<MobilePage toolbarShown={false}>
		<UpgradeContainer {...props} />
	</MobilePage>
);
