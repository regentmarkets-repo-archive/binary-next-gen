import React, { PropTypes, Component } from 'react';
import DropDown from '../containers/DropDown';
import LayoutButtonPanel from './LayoutButtonPanel';
import LayoutButton from './LayoutButton';

export default class LayoutPicker extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        tradesCount: PropTypes.number.isRequired,
        layoutN: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            dropdownShown: false,
        };
    }

    render() {
        const { actions, tradesCount, layoutN } = this.props;
        const { dropdownShown } = this.state;

        return (
            <div className="centerer">
                <LayoutButton
                    tradesCount={tradesCount}
                    layoutN={layoutN}
                    onClick={() => this.setState({ dropdownShown: true })}
                />
                <DropDown
                    shown={dropdownShown}
                    onClose={() => this.setState({ dropdownShown: false })}
                >
                    <LayoutButtonPanel
                        tradesCount={tradesCount}
                        layoutN={layoutN}
                        onLayoutChange={(...params) => {
                            actions.changeActiveLayout(...params);
                            this.setState({ dropdownShown: false });
                        }}
                    />
                </DropDown>
            </div>
        );
    }
}
