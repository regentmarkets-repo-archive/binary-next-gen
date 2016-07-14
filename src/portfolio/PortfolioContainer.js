import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import PortfolioCard from './PortfolioCard';
import PortfolioSelectors from './PortfolioSelectors';

@connect(PortfolioSelectors)
export default class PortfolioContainer extends PureComponent {

	render() {
		return (
			<PortfolioCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
