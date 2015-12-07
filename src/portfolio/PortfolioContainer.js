import React from 'react';
import { connect } from 'react-redux';
import PortfolioCard from './PortfolioCard';

@connect(state => ({ portfolio: state.portfolio }))
export default class PortfolioContainer extends React.Component {

	static propTypes = {
		portfolio: React.PropTypes.object,
		dispatch: React.PropTypes.func,
	};

	render() {
		return (
			<PortfolioCard {...this.props} />
		);
	}
}
