import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import { actions } from '../_store';
import MobilePage from '../containers/MobilePage';
import TradeTypePicker from './TradeTypePicker';
import {
    mobileTradeTypePickerSelector,
} from '../trade/mobile/singleTradeSelectors';

@connect(mobileTradeTypePickerSelector)
export default class TradeTypePickerMobile extends PureComponent {
    static contextTypes = {
        router: () => undefined,
    };

    onSelectForMobile = () => {
        const { router } = this.context;
        router.goBack();
    };

    clearTradeError = () => {
        actions.clearTradeError(0);
    };

    render() {
        const { contract, params } = immutableChildrenToJS(this.props);

        if (!contract) return null;

        return (
            <MobilePage toolbarShown={false} backBtnBarTitle="Trade Type">
                <TradeTypePicker
                    index={0}
                    contract={contract}
                    tradeParams={params}
                    onSelect={this.onSelectForMobile}
                />
            </MobilePage>
        );
    }
}
