import React, { PropTypes, Component } from 'react';
import { FormattedTime } from 'react-intl';
import NumberPlain from '../_common/NumberPlain';
import NumberColored from '../_common/NumberColored';

export default class StatementRow extends Component {

    static contextTypes = {
        router: React.PropTypes.object,
    };

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

    showContractDetails(contractId) {
        const { actions } = this.props;
        const { router } = this.context;
        actions.detailsForContract(true, contractId).then(() => router.push(`/statement-view/${contractId}`));
    }

    render() {
        const { contractId, compact, refN, date, actionType, amount, balanceAfter } = this.props;

        return (
            <tr className="statement-row" onClick={() => this.showContractDetails(contractId)}>
                <td><FormattedTime value={date} format="full" /></td>
                {!compact && <td>{refN}</td>}
                <td className="trade-action">{actionType}</td>
                <td><NumberColored value={amount} /></td>
                <td><NumberPlain value={balanceAfter} /></td>
            </tr>
        );
    }
}
