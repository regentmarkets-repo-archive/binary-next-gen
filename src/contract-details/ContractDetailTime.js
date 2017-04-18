import React, { PureComponent } from 'react';
import { M } from 'binary-components';
import { epochToDate, dateToGMTString, contractCodeToText } from 'binary-utils';

const epochToGMTString = epoch => dateToGMTString(epochToDate(epoch));

export default class ContractDetailTime extends PureComponent {
    props: {
        contract: Contract,
        code: string,
    };

    render() {
        const { contract, code } = this.props;

        return (
            <div className="contract-detail">
                <M m={contractCodeToText(code)} />
                <span>
                    {contract[code] ? epochToGMTString(contract[code]) : '–'}
                </span>
            </div>
        );
    }
}
