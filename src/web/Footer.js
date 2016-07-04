import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import FullScreenSwitcher from './FullScreenSwitcher';
import ClockContainer from './ClockContainer';
import LanguagePicker from './LanguagePicker';

export default class Footer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fullScreen: false,
		};
	}

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<div id="footer" className="inverse">
				<FullScreenSwitcher />
				<div id="clock" >
					<ClockContainer />
				</div>
				<LanguagePicker />
			</div>
		);
	}
}
