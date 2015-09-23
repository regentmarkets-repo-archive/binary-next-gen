import React from 'react';
import SegmentedControl from '../common/SegmentedControl';

export default class SettingsPane extends React.Component {

	static propTypes = {
		children: React.PropTypes.any,
    };

	constructor(props) {
		super(props);

		this.state = {
			currentPage: 0,
		};
	}

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
				<SegmentedControl segments={navigationLinks} />
				{this.props.children}
			</div>
		);
	}
}
