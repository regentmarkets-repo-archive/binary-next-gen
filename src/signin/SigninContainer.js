import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import SigninCard from './SigninCard';
import signinSelectors from '../_selectors/SigninSelectors';

@connect(signinSelectors)
export default class SigninContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<SigninCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
