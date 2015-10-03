import React from 'react';
import { connect } from 'react-redux';
import PortfolioPane from './PortfolioPane';

@connect(state => ({ portfolio: state.portfolio }))
export default class PortfolioContainer extends React.Component {

	static propTypes = {
		portfolio: React.PropTypes.object,
		dispatch: React.PropTypes.func,
	};

	render() {
		return (
			<PortfolioPane {...this.props} />
		);
	}
}
