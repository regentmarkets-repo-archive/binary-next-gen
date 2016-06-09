import React, { PropTypes, Component } from 'react';
import NumberPlain from 'binary-components/lib/NumberPlain';
import NumberColored from 'binary-components/lib/NumberColored';

export default class PortfolioItem extends Component {

    static propTypes = {
        contract: PropTypes.object.isRequired,
        onViewDetails: PropTypes.func.isRequired,
    };

    render() {
        const { contract, onViewDetails } = this.props;

        return (
            <tr className="portfolio-row" onClick={() => onViewDetails(contract)}>
                <td>{contract.transaction_ids && contract.transaction_ids.buy}</td>
                <td>
                    <NumberPlain
                        currency={contract.currency}
                        value={contract.buy_price}
                    />
                </td>
                <td>
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
