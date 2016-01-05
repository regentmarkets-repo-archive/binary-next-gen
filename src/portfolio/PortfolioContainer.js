import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PortfolioCard from './PortfolioCard';

@connect(state => ({ portfolio: state.portfolio }))
export default class PortfolioContainer extends React.Component {

	static propTypes = {
		portfolio: PropTypes.object,
		dispatch: PropTypes.func,
		actions: PropTypes.object.isRequired,
	};

	render() {
		return (
			<PortfolioCard {...this.props} />
		);
	}
}
