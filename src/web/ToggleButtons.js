import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

export default class ToggleButtons extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		leftPanelVisible: PropTypes.bool.isRequired,
		rightPanelVisible: PropTypes.bool.isRequired,
		tradeMode: PropTypes.string.isRequired,
	};

	render() {
		const { leftPanelVisible, rightPanelVisible, tradeMode, actions } = this.props;

		const leftBtnClasses = classNames({
			'btn-secondary ': true,
			checked: leftPanelVisible,
		});
		const rightBtnClasses = classNames({
			'btn-secondary ': true,
			checked: rightPanelVisible,
		});

		const gridBtnClasses = classNames({
			'btn-secondary ': true,
			checked: tradeMode === 'grid',
		});
		const tabsBtnClasses = classNames({
			'btn-secondary ': true,
			checked: tradeMode === 'tabs',
		});
		const jpBtnClasses = classNames({
			'btn-secondary ': true,
			checked: tradeMode === 'jp',
		});

		return (
			<div className="toggle-buttons">
				<button
					className={leftBtnClasses}
					onClick={() => actions.togglePanel('left')}
				>
					<img src="img/left-panel.svg" />
				</button>
				<button
					className="btn-secondary"
					onClick={() => actions.toggleTradeMode()}
					className={rightBtnClasses}
					onClick={() => actions.togglePanel('right')}
				>
					<img src="img/right-panel.svg" />
				</button>
				&nbsp;
				<button
					className={gridBtnClasses}
					onClick={() => actions.changeTradeMode('grid')}
				>
					<img src="img/bottom-panel.svg" />
				</button>
				<button
					className={tabsBtnClasses}
					onClick={() => actions.changeTradeMode('tabs')}
				>
					<img src="img/bottom-panel.svg" />
				</button>
				<button
					className={jpBtnClasses}
					onClick={() => actions.changeTradeMode('jp')}
				>
					<img src="img/bottom-panel.svg" />
				</button>
			</div>
		);
	}
}
