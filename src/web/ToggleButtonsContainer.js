import React, { Component } from 'react';
import { connect } from 'react-redux';
import immutableChildrenToJS from '../_utils/immutableChildrenToJS';

import toggleButtonsSelector from './toggleButtonsSelector';
import shouldPureComponentUpdate from 'react-pure-render/function';
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
