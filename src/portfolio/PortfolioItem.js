import React, { PropTypes } from 'react';
import { M, NumberPlain, NumberColored } from '../_common';

export default class PortfolioItem extends React.Component {

    static propTypes = {
        compact: PropTypes.bool,
        contract: PropTypes.object.isRequired,
        onViewDetails: PropTypes.func.isRequired,
    };

    render() {
        const { compact, contract, onViewDetails } = this.props;

        return (
            <tr onClick={() => onViewDetails(contract)}>
                <td>{contract.transaction_id}</td>
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
                {!compact &&
                    <td>
                        <button onClick={() => onViewDetails(contract)}>
                            <M m="View" />
                        </button>
                    </td>
                }
            </tr>
        );
    }
}
