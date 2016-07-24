import React, { PropTypes, PureComponent } from 'react';
import M from 'binary-components/lib/M';
import { actions } from '../_store';
import styles from '../layouts/layouts.css';
import DropDown from '../containers/DropDown';
import LayoutButtonPanel from './LayoutButtonPanel';
import LayoutButton from './LayoutButton';

export default class LayoutPicker extends PureComponent {

    static propTypes = {
        tradesCount: PropTypes.number.isRequired,
        layoutN: PropTypes.number.isRequired,
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
    }

    open = () => this.setState({ dropdownShown: true });

    close = () => this.setState({ dropdownShown: false });

    onSingleTradeClick = () =>
        actions.changeActiveLayout(1, 1);

    render() {
        const { tradesCount, layoutN } = this.props;
        const { dropdownShown } = this.state;

        return (
            <div className={styles.layoutPicker}>
                <a className="btn-secondary layout-switch-btn" onClick={this.onSingleTradeClick}>
                    <LayoutButton
                        tradesCount={1}
                        layoutN={1}
                    />
                    <M m="Single Trade" />
                </a>
                <DropDown
                    shown={dropdownShown}
                    onClose={this.close}
                    title="Layout"
                >
                    <LayoutButtonPanel
                        tradesCount={tradesCount}
                        layoutN={layoutN}
                        onLayoutChange={this.onLayoutChange}
                    />
                </DropDown>
                <a className="btn-secondary layout-switch-btn" onClick={this.open}>
                    <LayoutButton
                        tradesCount={tradesCount}
                        layoutN={layoutN}
                        onClick={this.close}
                    />
                    <M m="Multi Trade" />
                </a>
            </div>
        );
    }
}
