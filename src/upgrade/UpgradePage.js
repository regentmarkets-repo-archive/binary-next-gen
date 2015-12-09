import React from 'react';
import { MobilePage } from '../_common';
import UpgradeCard from './UpgradeCard';

export default (props) => (
	<MobilePage toolbarShown={false}>
		<UpgradeCard {...props} />
	</MobilePage>
);
