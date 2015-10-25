import React from 'react';
import { MobilePage } from '../_common';
import NavigationMenu from './NavigationMenu';

export default (props) => (
	<MobilePage toolbarShown={false}>
		<NavigationMenu {...props} />
	</MobilePage>
);
