import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import ClockContainer from './ClockContainer';
import LanguagePicker from '../_common/LanguagePicker';

export default class WebHeader extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		actions: PropTypes.object.isRequired,
	};

	render() {
		return (
			<div id="footer" className="inverse">
				<div id="clock" >
					<ClockContainer />
				</div>

				<LanguagePicker className="language-picker" />
			</div>
		);
	}
}
