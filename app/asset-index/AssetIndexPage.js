import React from 'react';
import SegmentedControl from './SegmentedControl';

export default class AsssetIndexPage extends React.Component {

	static getProps() {
		return {};
	}

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
                <SegmentedControl>
                </SegmentedControl>
			</div>
		);
	}
}
