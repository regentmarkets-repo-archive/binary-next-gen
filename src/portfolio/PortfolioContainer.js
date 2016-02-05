import React from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import PortfolioCard from './PortfolioCard';
import portfolioSelectors from '../_selectors/PortfolioSelectors';

@connect(portfolioSelectors)
export default class PortfolioContainer extends React.Component {
	render() {
		return (
			<PortfolioCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
