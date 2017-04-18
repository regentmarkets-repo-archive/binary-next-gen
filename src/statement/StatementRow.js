import React, { PureComponent } from 'react';
import { FormattedTime } from 'react-intl';
import { NumberPlain, NumberColored } from 'binary-components';
import { showError } from 'binary-utils';
import { actions } from '../_store';

export default class StatementRow extends PureComponent {
    props: {
        compact: boolean,
        contractId: string,
        refN: string,
        date: object,
        actionType: string,
        amount: number,
        balanceAfter: number,
    };

    static contextTypes = {
        router: () => undefined,
    };

    viewContract = () => {
        const { compact, contractId } = this.props;
        const { router } = this.context;

        // if deposit or withdraw
        if (!contractId) return;

        actions
            .detailsForContract(contractId)
            .then(() => {
                if (compact) {
                    router.push('/contract');
                }
            })
            .catch(e => showError(e));
    };

    render() {
        const {
            compact,
            refN,
            date,
            actionType,
            amount,
            balanceAfter,
        } = this.props;

        return (
            <tr className="statement-row" onClick={this.viewContract}>
                <td className="date">
                    <FormattedTime value={date} format="full" />
                </td>
                {!compact && <td className="textual">{refN}</td>}
                <td className="trade-action">{actionType}</td>
                <td className="numeric"><NumberColored value={amount} /></td>
                <td className="numeric">
                    <NumberPlain value={balanceAfter} />
                </td>
            </tr>
        );
    }
}
