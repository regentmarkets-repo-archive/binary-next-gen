import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import requestFullScreen from 'binary-utils/lib/requestFullscreen';
import exitFullScreen from 'binary-utils/lib/exitFullScreen';
import addFullScreenEventListener from 'binary-utils/lib/addFullscreenEventListener';
import removeFullScreenEventListener from 'binary-utils/lib/removeFullscreenEventListener';
import ClockContainer from './ClockContainer';
// import LanguagePicker from './LanguagePicker';

export default class Footer extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			fullScreen: false,
		};
	}

	componentWillMount() {
		addFullScreenEventListener(this.toggleFullScreenState);
	}

	shouldComponentUpdate = shouldPureComponentUpdate;

	componentWillUnmount() {
		removeFullScreenEventListener(this.toggleFullScreenState);
	}

	toggleFullScreenState = () => {
		if (this.state.fullScreen) {
			this.setState({ fullScreen: false });
		} else {
			this.setState({ fullScreen: true });
		}
	}

	fullScreen = () => requestFullScreen(document.getElementById('root'));

	minimize = () => exitFullScreen();

	render() {
		const { fullScreen } = this.state;
		return (
			<div id="footer" className="inverse">
				<button
					className="btn-secondary"
					style={{ margin: '0.5rem' }}
					onClick={fullScreen ? this.minimize : this.fullScreen}
				>
					{fullScreen ? 'Minimize' : 'Full Screen'}
				</button>
				<div id="clock" >
					<ClockContainer />
				</div>
				{/* <LanguagePicker {...this.props} className="language-picker" /> */}
			</div>
		);
	}
}
