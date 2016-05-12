import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import requestFullScreen from 'binary-utils/lib/requestFullscreen';
import ClockContainer from './ClockContainer';
import LanguagePicker from '../_common/LanguagePicker';
import Perf from 'react-addons-perf';

const performPerfTest = () => {
	Perf.start();
	setTimeout(() => {
		Perf.stop();
		const measurements = Perf.getLastMeasurements();
		// Perf.printInclusive(measurements);
		Perf.printWasted(measurements);
		// Perf.printOperations(measurements);
	}, 10000);
};

// console.log(process.env !== 'production');

export default class Footer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		actions: PropTypes.object.isRequired,
	};

	render() {
		return (
			<div id="footer" className="inverse">
				<button
					className="btn-secondary"
					style={{ margin: '0.5rem' }}
					onClick={() => requestFullScreen(document.getElementById('root'))}
				>
					Full Screen
				</button>
				<div id="clock" >
					<ClockContainer />
				</div>
				<button className="btn-secondary" onClick={performPerfTest}>Perf Test</button>
				<LanguagePicker {...this.props} className="language-picker" />
			</div>
		);
	}
}
