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
        const { tradesCount, layoutN } = this.props;
        return (
            <div className="centerer">
                <LayoutButton tradesCount={tradesCount} layoutN={layoutN} />
                <DropDown
                    shown={false}
                    onClose={() => this.updateHelper('showAssetPicker', false, false)}
                >
                    <LayoutButtonPanel />
                </DropDown>
            </div>
        );
    }
}
