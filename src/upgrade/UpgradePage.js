import React from 'react';
import MobilePage from '../containers/MobilePage';
import UpgradeContainer from './UpgradeContainer';

export default (props) => (
	<MobilePage toolbarShown={false}>
		<UpgradeContainer {...props} />
	</MobilePage>
);
