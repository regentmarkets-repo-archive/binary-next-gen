import React, { PropTypes, Component } from 'react';
import { FormattedTime } from 'react-intl';
import NumberPlain from 'binary-components/lib/NumberPlain';
import NumberColored from 'binary-components/lib/NumberColored';

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

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    render() {
        const { actions, contractId, compact, refN, date, actionType, amount, balanceAfter } = this.props;
        const { router } = this.context;
        const viewContract = () =>
            actions.detailsForContract(contractId)
                .then(() => {
                    if (compact) {
                        router.push(`/contract/${contractId}`);
                    }
                });
        return (
            <tr className="statement-row" onClick={viewContract}>
                <td><FormattedTime value={date} format="full" /></td>
                {!compact && <td>{refN}</td>}
                <td className="trade-action">{actionType}</td>
                <td><NumberColored value={amount} /></td>
                <td><NumberPlain value={balanceAfter} /></td>
            </tr>
        );
    }
}
