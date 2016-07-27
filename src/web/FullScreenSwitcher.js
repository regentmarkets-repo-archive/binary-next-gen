import React, { PureComponent } from 'react';
import { Button } from 'binary-components';
import { requestFullscreen, exitFullScreen,
	addFullscreenEventListener, removeFullscreenEventListener } from 'binary-utils';
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
		addFullscreenEventListener(e =>
			this.setState({ isFullScreen: e })
		);
	}

	componentWillUnmount() {
		removeFullscreenEventListener();
	}

	toggleFullScreenState = () => {
		const { isFullScreen } = this.state;
		this.setState({ isFullScreen: !isFullScreen });
		if (isFullScreen) {
			exitFullScreen();
		} else {
			requestFullscreen(document.getElementById('root'));
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
