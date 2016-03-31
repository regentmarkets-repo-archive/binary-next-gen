import React, { PropTypes, Component } from 'react';
import Button from '../_common/Button';
import NumberPlain from '../_common/NumberPlain';
import NumberColored from '../_common/NumberColored';

export default class PortfolioItem extends Component {

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
                        <Button
                            text="View"
                            className="btn-secondary"
                            onClick={() => onViewDetails(contract)}
                        />
                    </td>
                }
            </tr>
        );
    }
}
