import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import requestFullScreen from 'binary-utils/lib/requestFullscreen';
import ClockContainer from './ClockContainer';
// import LanguagePicker from './LanguagePicker';

export default class Footer extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	fullScreen = () => requestFullScreen(document.getElementById('root'));

	render() {
		return (
			<div id="footer" className="inverse">
				<button
					className="btn-secondary"
					style={{ margin: '0.5rem' }}
					onClick={this.fullScreen}
				>
					Full Screen
				</button>
				<div id="clock" >
					<ClockContainer />
				</div>
				{/* <LanguagePicker {...this.props} className="language-picker" /> */}
			</div>
		);
	}
}
