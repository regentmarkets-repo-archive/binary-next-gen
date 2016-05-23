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
		window.location = 'https://www.binary.com/oauth2/authorize?app_id=1006';
		return null;
		return (
			<SigninCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
