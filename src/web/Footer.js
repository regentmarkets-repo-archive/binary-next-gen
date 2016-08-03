import React, { PureComponent } from 'react';
import FullscreenSwitcher from './FullscreenSwitcher';
import ClockContainer from './ClockContainer';
import LanguagePicker from './LanguagePicker';

export default class Footer extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			fullScreen: false,
		};
	}

	render() {
		return (
			<div id="footer" className="inverse">
				<FullscreenSwitcher />
				<div id="clock" >
					<ClockContainer />
				</div>
				<LanguagePicker />
			</div>
		);
	}
}
