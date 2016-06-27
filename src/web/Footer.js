import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import requestFullScreen from 'binary-utils/lib/requestFullscreen';
import exitFullScreen from 'binary-utils/lib/exitFullScreen';
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

	shouldComponentUpdate = shouldPureComponentUpdate;

	fullScreen = () => {
		requestFullScreen(document.getElementById('root'));
		this.setState({ fullScreen: true });
	};

	minimize = () => {
		exitFullScreen(document.getElementById('root'));
		this.setState({ fullScreen: false });
	};

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
