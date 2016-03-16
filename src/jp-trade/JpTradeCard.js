import React, { PropTypes, Component } from 'react';
import JpPayoutPicker from './JpPayoutPicker';
import JpPeriodPicker from './JpPeriodPicker';
import JpTradeTypesPicker from './JpTradeTypesPicker';

export default class JpTradeCard extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
    };

    render() {
        const { actions } = this.props;
        return (
            <div className="trades-jp">
                <JpTradeTypesPicker actions={actions} />
                <JpPeriodPicker actions={actions} />
                <JpPayoutPicker actions={actions} />
            </div>
        );
    }
}
