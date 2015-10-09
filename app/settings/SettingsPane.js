import React from 'react';
import { DesktopToolbar } from '../navigation';
import { SegmentedControl } from '../common';

export default class SettingsPane extends React.Component {

	static propTypes = {
		children: React.PropTypes.any,
    };

	render() {
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
				<DesktopToolbar />
				<SegmentedControl segments={navigationLinks} />
				{this.props.children}
			</div>
		);
	}
}
