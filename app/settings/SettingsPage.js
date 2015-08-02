import React from 'react';
import SegmentedControl from '../common/SegmentedControl';

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

		return (
			<div>
				<SegmentedControl
					segments={['Personal Details', 'Security', 'Self Exclusion', 'Limits']}
					onSelect={this.pageSelect} />
				{this.props.children}
			</div>
		);
	}
}
