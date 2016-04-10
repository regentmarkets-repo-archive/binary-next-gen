import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import PortfolioCard from './PortfolioCard';
import portfolioSelectors from './PortfolioSelectors';

@connect(portfolioSelectors)
export default class PortfolioContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<PortfolioCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
