import React from 'react';
import MobilePage from '../containers/MobilePage';
import UpgradeCard from './UpgradeCard';

export default (props) => (
	<MobilePage toolbarShown={false} inverse>
		<UpgradeCard {...props} />
	</MobilePage>
);
