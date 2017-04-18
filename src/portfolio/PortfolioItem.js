import React, { PureComponent } from 'react';
import { NumberPlain, NumberColored } from 'binary-components';

const openContractSubscriptionFailed = contract =>
    contract.validation_error && Object.keys(contract).length < 3;

export default class PortfolioItem extends PureComponent {
    props: {
        contract: Contract,
        onViewDetails: (contract: Contract) => void,
    };

    onViewDetailsClicked = () => {
        const { contract, onViewDetails } = this.props;
        onViewDetails(contract);
    };

    render() {
        const { contract } = this.props;
        const backendFailure = openContractSubscriptionFailed(contract);

        if (backendFailure) return null;

        return (
            <tr className="portfolio-row" onClick={this.onViewDetailsClicked}>
                <td>
                    {contract.transaction_ids && contract.transaction_ids.buy}
                </td>
                <td className="numeric">
                    <NumberPlain
                        currency={contract.currency}
                        value={contract.payout}
                    />
                </td>
                <td className="numeric">
                    <NumberPlain
                        currency={contract.currency}
                        value={contract.buy_price}
                    />
                </td>
                <td className="numeric">
                    {contract &&
                        <NumberColored
                            currency={contract.currency}
                            value={contract.bid_price}
                            isProfit={v => v - contract.buy_price}
                        />}
                </td>
            </tr>
        );
    }
}
