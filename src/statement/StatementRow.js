import React, { PropTypes, Component } from 'react';
import { FormattedTime } from 'react-intl';
import NumberPlain from '../_common/NumberPlain';
import NumberColored from '../_common/NumberColored';

export default class StatementRow extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        compact: PropTypes.bool,
        contractId: PropTypes.string.isRequired,
        refN: PropTypes.string.isRequired,
        date: PropTypes.object.isRequired,
        actionType: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        balanceAfter: PropTypes.number.isRequired,
    };

    render() {
        const { actions, contractId, compact, refN, date, actionType, amount, balanceAfter } = this.props;

        return (
            <tr onClick={() => actions.detailsForContract(true, contractId)}>
                <td><FormattedTime value={date} format="full" /></td>
                {!compact && <td>{refN}</td>}
                <td className="trade-action">{actionType}</td>
                <td><NumberColored value={amount} /></td>
                <td><NumberPlain value={balanceAfter} /></td>
            </tr>
        );
    }
}
