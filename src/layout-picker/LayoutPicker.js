import React, { PropTypes, PureComponent } from 'react';
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

    render() {
        const { tradesCount, layoutN } = this.props;
        const { dropdownShown } = this.state;

        return (
            <div className={styles.layoutPicker}>
                <LayoutButton
                    tradesCount={tradesCount}
                    layoutN={layoutN}
                    onClick={this.open}
                />
                <DropDown
                    shown={dropdownShown}
                    onClose={this.close}
                >
                    <LayoutButtonPanel
                        tradesCount={tradesCount}
                        layoutN={layoutN}
                        onLayoutChange={this.onLayoutChange}
                    />
                </DropDown>
            </div>
        );
    }
}
