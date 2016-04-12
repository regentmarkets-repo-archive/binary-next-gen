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
		const { tradeMode, actions } = this.props;

		const tabsBtnClasses = classNames({
			'btn-secondary ': true,
			checked: tradeMode === 'tabs',
		});
		const gridBtnClasses = classNames({
			'btn-secondary ': true,
			checked: tradeMode === 'grid',
		});
		const jpBtnClasses = classNames({
			'btn-secondary ': true,
			checked: tradeMode === 'jp',
		});

		return (
			<div className="toggle-buttons">
				<button
					className={tabsBtnClasses}
					onClick={() => actions.changeTradeMode('tabs')}
				>
					<img src="img/tabs.svg" />
				</button>
				&nbsp;
				<button
					className={gridBtnClasses}
					onClick={() => actions.changeTradeMode('grid')}
				>
					<img src="img/grid.svg" />
				</button>
				&nbsp;
				<button
					className={jpBtnClasses}
					onClick={() => actions.changeTradeMode('jp')}
				>
					<img src="img/jp.svg" />
				</button>
			</div>
		);
	}
}
