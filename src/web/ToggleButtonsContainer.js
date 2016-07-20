import React, { Component } from 'react';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import toggleButtonsSelector from './toggleButtonsSelector';
import ToggleButtons from './ToggleButtons';

@connect(toggleButtonsSelector)
export default class ToggleButtonsContainer extends Component {

	render() {
		return (
			<ToggleButtons {...immutableChildrenToJS(this.props)} />
		);
	}
}
