import React from 'react';
import { SegmentedControl } from '../_common';

export default (props) => {
	const navigationLinks = [{
		href: '/settings/',
		text: 'Personal Details',
	}, {
		href: '/settings/security',
		text: 'Security',
	}, {
		href: '/settings/exclusion',
		text: 'Self Exclusion',
	}, {
		href: '/settings/limits',
		text: 'Limits',
	}];

	return (
		<div>
			<SegmentedControl segments={navigationLinks} />
			{props.children}
		</div>
	);
};
