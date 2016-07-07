import React, { Component, PropTypes } from 'react';
import LogoSpinner from 'binary-components/lib/LogoSpinner';
import InputGroup from 'binary-components/lib/InputGroup';
import Button from 'binary-components/lib/Button';


export default class CreateAccountCard extends Component {

	static propTypes = {
		progress: PropTypes.bool.isRequired,
		step: PropTypes.number.isRequired,
	};

	render() {
		const { progress } = this.props;

		return (
			<div className="create-account-card">
				<LogoSpinner spinning={progress} />
				<img className="logo-text" src="img/binary-type-logo.svg" alt="Logo" />
				<InputGroup
					type="email"
					placeholder="Email"
					onChange={this.emailChange}
				/>
				<Button text="Create Free Account" />
			</div>
		);
	}
}
