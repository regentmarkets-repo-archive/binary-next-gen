import React from 'react';
import { connect } from 'react-redux';
import PortfolioCard from './PortfolioCard';
import portfolioSelectors from '../_selectors/PortfolioSelectors';

@connect(portfolioSelectors)
export default class PortfolioContainer extends React.Component {
	render() {
		return (
			<PortfolioCard {...this.props} />
		);
	}
}
