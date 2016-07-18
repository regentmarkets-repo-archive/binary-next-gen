import React, { PureComponent } from 'react';
import Button from 'binary-components/lib/Button';
import requestFullScreen from 'binary-utils/lib/requestFullscreen';
import exitFullScreen from 'binary-utils/lib/exitFullScreen';
import addFullScreenEventListener from 'binary-utils/lib/addFullscreenEventListener';
import removeFullScreenEventListener from 'binary-utils/lib/removeFullscreenEventListener';
import { trackEvent } from 'binary-utils/lib/Analytics';

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
