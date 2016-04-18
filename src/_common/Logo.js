import React, { Component } from 'react';
import config from '../config';

export default class LogoSpinner extends Component {

	render() {
		return (
			<div id="logo">
				<img src={config.logo} role="presentation" />
				<img src={config.logo2} role="presentation" />
			</div>
		);
	}
}
