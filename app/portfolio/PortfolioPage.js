import React from 'react';
import { connect } from 'react-redux';
import { MobilePage } from '../common';
import PortfolioPane from './PortfolioPane';

@connect(state => ({ account: state.account, portfolio: state.portfolio }))
export default class PortfolioPage extends React.Component {

	static propTypes = {
		account: React.PropTypes.object.isRequired,
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
