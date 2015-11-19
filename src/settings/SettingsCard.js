import React from 'react';
import { SegmentedControl } from '../_common';

const SettingsCard = props => {
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

SettingsCard.propTypes = {
	children: React.PropTypes.any,
};

export default SettingsCard;
