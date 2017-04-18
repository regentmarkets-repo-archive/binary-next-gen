import React, { PureComponent } from 'react';
import { P } from 'binary-components';
import { actions } from '../_store';
import TradeViewChart from './trade-chart/TradeViewChart';
import TradeParams from '../trade-params/TradeParams';
import ContractReceipt from '../contract-details/ContractReceipt';

type Props = {
    compact: boolean,
    contractReceiptProps: Object,
    chartProps: Object,
    index: number,
    paramsProps: Object,
};

// this is used so that object identity is maintained
const hiddenStyle = { display: 'none' };

export default class TradeCard extends PureComponent {
    props: Props;
    shouldZoomLatest: boolean;

    static contextTypes = {
        router: () => undefined,
    };

    constructor(props: Props) {
        super(props);
        this.shouldZoomLatest = false;
    }

    componentDidUpdate(prevProps) {
        // ugly hack to ensure event is fired after chart is back to trade view
        if (
            prevProps.contractReceiptProps &&
            !this.props.contractReceiptProps &&
            this.shouldZoomLatest
        ) {
            this.fireZoomToLatest();
            this.shouldZoomLatest = false;
        }
    }

    tradeAgain = () => {
        const { index } = this.props;
        actions.closeContractReceipt(index);
        this.shouldZoomLatest = true;
    };

    fireZoomToLatest = () => {
        const { index } = this.props;
        const zoomToLatestEv = new CustomEvent('zoom-to-latest');
        const chartNode = document.getElementById(`trade-chart${index}`);
        if (chartNode) {
            chartNode.dispatchEvent(zoomToLatestEv);
        }
    };

    sellAtMarket = () => {
        const { contractReceiptProps } = this.props;
        actions.sellContract(contractReceiptProps.toJS().contract_id, 0);
    };

    render() {
        const {
            chartProps,
            contractReceiptProps,
            compact,
            paramsProps,
        } = this.props;
        const contractReceiptInJS =
            contractReceiptProps && contractReceiptProps.toJS();
        if (
            contractReceiptInJS && Object.keys(contractReceiptInJS).length === 0
        ) {
            return <P text="Asset not available" />;
        }

        return (
            <div className="trade-panel">
                {chartProps && <TradeViewChart {...chartProps} />}
                {contractReceiptInJS &&
                    <ContractReceipt
                        contract={contractReceiptInJS}
                        showLongcode
                        onTradeAgainClicked={this.tradeAgain}
                    />}
                {paramsProps.tradeParams &&
                    <TradeParams
                        {...paramsProps}
                        compact={compact}
                        style={contractReceiptInJS ? hiddenStyle : undefined}
                    />}
            </div>
        );
    }
}
