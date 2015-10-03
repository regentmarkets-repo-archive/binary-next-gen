import React from 'react';
import { connect } from 'react-redux';
import Popup from '../common/Popup';
import PortfolioPane from './PortfolioPane';

@connect(state => ({ portfolio: state.portfolio }))
export default class PortfolioPage extends React.Component {

	static propTypes = {
		portfolio: React.PropTypes.object,
		dispatch: React.PropTypes.func,
	};

	render() {
		return (
			<Popup>
				<PortfolioPane {...this.props} />
			</Popup>
		);
	}
}
