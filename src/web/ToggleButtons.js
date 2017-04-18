import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { actions } from '../_store';

export default class ToggleButtons extends PureComponent {
    props: {
        leftPanelVisible: boolean,
        sidePanelVisible: boolean,
        tradeMode: string,
    };

    switchToTabs = () => actions.changeTradeMode('tabs');

    switchToGrid = () => actions.changeTradeMode('grid');

    render() {
        const { tradeMode } = this.props;

        const tabsBtnClasses = classNames({
            'btn-secondary ': true,
            checked: tradeMode === 'tabs',
        });
        const gridBtnClasses = classNames({
            'btn-secondary ': true,
            checked: tradeMode === 'grid',
        });

        return (
            <div className="toggle-buttons">
                <button className={tabsBtnClasses} onClick={this.switchToTabs}>
                    <img src="img/tabs.svg" alt="Tabs" />
                </button>
                &nbsp;
                <button className={gridBtnClasses} onClick={this.switchToGrid}>
                    <img src="img/grid.svg" alt="Grid" />
                </button>
            </div>
        );
    }
}
