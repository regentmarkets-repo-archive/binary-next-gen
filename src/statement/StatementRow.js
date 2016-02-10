import React, { PropTypes } from 'react';
import { FormattedTime } from 'react-intl';
import { NumberPlain, NumberColored } from '../_common';

export default class StatementRow extends React.Component {

    static propTypes = {
        compact: PropTypes.bool,
        refId: PropTypes.string.isRequired,
        date: PropTypes.object.isRequired,
        actionType: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        balanceAfter: PropTypes.number.isRequired,
    };

    render() {
        const { compact, refId, date, actionType, amount, balanceAfter } = this.props;

        return (
            <tr>
                <td><FormattedTime value={date} format="full" /></td>
                {!compact && <td>{refId}</td>}
                <td className="trade-action">{actionType}</td>
                <td><NumberColored value={amount} /></td>
                <td><NumberPlain value={balanceAfter} /></td>
            </tr>
        );
    }
}
