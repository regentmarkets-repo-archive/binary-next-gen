import React, { PropTypes, PureComponent } from 'react';
import { FormattedTime } from 'react-intl';
import { NumberPlain, NumberColored } from 'binary-components';
import { showError } from 'binary-utils';
import { actions } from '../_store';

export default class StatementRow extends PureComponent {

    static propTypes = {
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

    viewContract = () => {
        const { compact, contractId } = this.props;
        const { router } = this.context;

        actions.detailsForContract(contractId)
            .then(() => {
                if (compact) {
                    router.push(`/contract/${contractId}`);
                }
            })
            .catch(e => showError(e));
    }

    render() {
        const { compact, refN, date, actionType, amount, balanceAfter } = this.props;

        return (
            <tr className="statement-row" onClick={this.viewContract}>
                <td className="date">
                    <FormattedTime value={date} format="full" />
                </td>
                {!compact && <td className="textual">{refN}</td>}
                <td className="trade-action">{actionType}</td>
                <td className="numeric"><NumberColored value={amount} /></td>
                <td className="numeric"><NumberPlain value={balanceAfter} /></td>
            </tr>
        );
    }
}
