import React, { PureComponent } from 'react';
import { M } from 'binary-components';
import { actions } from '../_store';
import styles from '../layouts/layouts.css';
import DropDown from '../containers/DropDown';
import LayoutButtonPanel from './LayoutButtonPanel';
import LayoutButton from './LayoutButton';

export default class LayoutPicker extends PureComponent {
    props: {
        tradesCount: number,
        layoutN: number,
    };

    constructor(props) {
        super(props);
        this.state = {
            dropdownShown: false,
        };
    }

    onLayoutChange = (...params) => {
        actions.changeActiveLayout(...params);
        this.setState({ dropdownShown: false });
    };

    onSingleTradeClick = () => actions.changeActiveLayout(1, 1);

    openPicker = () => this.setState({ dropdownShown: true });

    closePicker = () => this.setState({ dropdownShown: false });

    render() {
        const { tradesCount, layoutN } = this.props;
        const { dropdownShown } = this.state;

        return (
            <div className={styles.layoutPicker}>
                <a
                    className="btn-secondary layout-switch-btn"
                    onClick={this.onSingleTradeClick}
                >
                    <LayoutButton tradesCount={1} layoutN={1} />
                    <M m="Single Trade" />
                </a>
                <DropDown
                    shown={dropdownShown}
                    onClose={this.closePicker}
                    title="Layout"
                >
                    <LayoutButtonPanel
                        tradesCount={tradesCount}
                        layoutN={layoutN}
                        onLayoutChange={this.onLayoutChange}
                    />
                </DropDown>
                <a
                    className="btn-secondary layout-switch-btn"
                    onClick={this.openPicker}
                >
                    <LayoutButton
                        tradesCount={tradesCount}
                        layoutN={layoutN}
                        onClick={this.closePicker}
                    />
                    <M m="Multi Trade" />
                </a>
            </div>
        );
    }
}
