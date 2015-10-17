import React from 'react';
import { MobilePage } from '../common';

export default class TickTradeMobile extends React.Component {

	static propTypes = {
		children: React.PropTypes.any,
    };

	render() {
		return (
			<MobilePage>
				{this.props.children}
			</MobilePage>
		);
	}
}
