import React from 'react';
import { MobilePage } from '../common';
import NavigationMenu from './NavigationMenu';

export default (props) => (
	<MobilePage toolbarShown={false}>
		<NavigationMenu {...props} />
	</MobilePage>
);
