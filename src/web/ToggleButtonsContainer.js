import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import toggleButtonsSelector from './toggleButtonsSelector';
import ToggleButtons from './ToggleButtons';

@connect(toggleButtonsSelector)
export default class ToggleButtonsContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<ToggleButtons {...immutableChildrenToJS(this.props)} />
		);
	}
}
