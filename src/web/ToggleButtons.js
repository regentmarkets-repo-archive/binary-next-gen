import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import toggleButtonsSelector from './toggleButtonsSelector';

@connect(toggleButtonsSelector)
export default class ToggleButtons extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		leftPanelVisible: PropTypes.bool.isRequired,
		rightPanelVisible: PropTypes.bool.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		const { leftPanelVisible, rightPanelVisible, actions } = this.props;

		return (
			<div className="toggle-buttons">
				<button
					className={`btn-secondary ${leftPanelVisible && 'checked'}`}
					onClick={() => actions.togglePanel('left')}
				>
					<img src="img/left-panel.svg" />
				</button>
				<button
					className={`btn-secondary`}
					onClick={() => actions.toggleTradeMode()}
				>
					<img src="img/bottom-panel.svg" />
				</button>
				<button
					className={`btn-secondary ${rightPanelVisible && 'checked'}`}
					onClick={() => actions.togglePanel('right')}
				>
					<img src="img/right-panel.svg" />
				</button>
			</div>
		);
	}
}
