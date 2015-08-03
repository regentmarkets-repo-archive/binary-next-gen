import React from 'react';
import SegmentedControl from '../common/SegmentedControl';
import { Link } from 'react-router';


export default class SettingsPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentPage: 0
		};
	}

	pageSelect(e) {
		console.log(e);
	}

	render() {

		const navigationLinks = [{
			href: '/settings/details',
			text: 'Personal Details'
		}, {
			href: '/settings/security',
			text: 'Security'
		}, {
			href: '/settings/exclusion',
			text: 'Self Exclusion'
		}, {
			href: '/settings/limits',
			text: 'Limits'
		}];

		return (
			<div>
				<SegmentedControl
					segments={navigationLinks}
					onSelect={this.pageSelect} />
				{this.props.children}
			</div>
		);
	}
}
