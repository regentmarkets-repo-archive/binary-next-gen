import React, { PropTypes, PureComponent } from 'react';
import NumberPlain from 'binary-components/lib/NumberPlain';
import NumberColored from 'binary-components/lib/NumberColored';
import { openContractSubscriptionFailed } from '../_utils/utils';

export default class PortfolioItem extends PureComponent {

    static propTypes = {
        contract: PropTypes.object.isRequired,
        onViewDetails: PropTypes.func.isRequired,
    };

    onViewDetailsClicked = () => {
        const { contract, onViewDetails } = this.props;
        onViewDetails(contract);
    }

    render() {
        const { contract } = this.props;
        const backendFailure = openContractSubscriptionFailed(contract);
        if (backendFailure) return null;
        return (
            <tr className="portfolio-row" onClick={this.onViewDetailsClicked}>
                <td>{contract.transaction_ids && contract.transaction_ids.buy}</td>
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
