import React, { PureComponent } from 'react';
import { Button } from 'binary-components';
import wuut, { requestFullScreen, exitFullScreen,
	addFullScreenEventListener, removeFullScreenEventListener } from 'binary-utils';
import { trackEvent } from 'binary-utils/lib/Analytics';

console.log(requestFullScreen, addFullScreenEventListener);
console.log(wuut);
console.log(Button);

export default class FullScreenSwitcher extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			fullScreen: false,
		};
	}

	componentWillMount() {
		addFullScreenEventListener(e =>
			this.setState({ isFullScreen: e })
		);
	}

	componentWillUnmount() {
		removeFullScreenEventListener();
	}

	toggleFullScreenState = () => {
		const { isFullScreen } = this.state;
		this.setState({ isFullScreen: !isFullScreen });
		if (isFullScreen) {
			exitFullScreen();
		} else {
			requestFullScreen(document.getElementById('root'));
			trackEvent('Workspace', 'FullScreen', isFullScreen);
		}
	}

	render() {
		const { isFullScreen } = this.state;
		return (
			<Button
				className="full-screen-button btn-secondary"
				onClick={this.toggleFullScreenState}
				text={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
			/>
		);
	}
}
