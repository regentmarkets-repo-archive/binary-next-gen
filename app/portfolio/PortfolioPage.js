import React from 'react';
import { connect } from 'react-redux';
import { MobilePage } from '../common';
import PortfolioPane from './PortfolioPane';

@connect(state => ({ portfolio: state.portfolio }))
export default class PortfolioPage extends React.Component {

	static propTypes = {
		portfolio: React.PropTypes.object,
		dispatch: React.PropTypes.func,
	};

	render() {
		return (
			<MobilePage>
				<PortfolioPane {...this.props} />
			</MobilePage>
		);
	}
}
