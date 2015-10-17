import React from 'react';
import * as Actions from '../_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PortfolioCard from './PortfolioCard';

@connect(state => ({ portfolio: state.portfolio }))
export default class PortfolioContainer extends React.Component {

	static propTypes = {
		portfolio: React.PropTypes.object,
		dispatch: React.PropTypes.func,
	};

	render() {
		return (
			<PortfolioCard actions={bindActionCreators(Actions, this.props.dispatch)} {...this.props} />
		);
	}
}
