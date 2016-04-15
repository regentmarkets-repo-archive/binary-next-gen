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

    render() {
        const { actions, tradesCount, layoutN } = this.props;
        return (
            <div className="centerer">
                <LayoutButton tradesCount={tradesCount} layoutN={layoutN} />
                <DropDown
                    shown={false}
                    onClose={() => actions.changeActiveLayout(2, 2)}
                >
                    <LayoutButtonPanel />
                </DropDown>
            </div>
        );
    }
}
