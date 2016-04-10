import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import SigninCard from './SigninCard';
import signinSelectors from './SigninSelectors';

@connect(signinSelectors)
export default class SigninContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<SigninCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
