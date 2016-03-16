import React, { PropTypes, Component } from 'react';
import { FormattedTime } from 'react-intl';
import M from '../_common/M';

export default class CompleteContractView extends Component {
    static propTypes = {
        contractId: PropTypes.string.isRequired,
        buyPrice: PropTypes.number.isRequired,
        payoutPrice: PropTypes.number,
        buySpot: PropTypes.number.isRequired,
        endSpot: PropTypes.number,
        startTime: PropTypes.number.isRequired,
        endTime: PropTypes.number,
    };

    render() {
        const { contractId, buyPrice, payoutPrice, buySpot, endSpot, startTime, endTime } = this.props;
        const ended = !!payoutPrice;

        const startTimeDate = new Date(startTime * 1000);
        const endTimeDate = ended && new Date(endTime * 1000);

        const profit = ended && (payoutPrice - buyPrice) > 0;

        return (
            <div>
                <table>
                    <tr>
                        <td><M m="Contract ID" /></td>
                        <td><M m={contractId} /></td>
                    </tr>
                    <tr>
                        <td><M m="Buy Price" /></td>
                        <td><M m={buyPrice} /></td>
                    </tr>
                    {ended &&
                        <tr>
                            <td><M m="Payout Price" /></td>
                            <td><M m={payoutPrice} /></td>
                        </tr>}
                    <tr>
                        <td><M m="Entry Spot" /></td>
                        <td><M m={buySpot} /></td>
                    </tr>
                    {ended &&
                    <tr>
                        <td><M m="Exit Spot" /></td>
                        <td><M m={endSpot} /></td>
                    </tr>}
                    <tr>
                        <td><M m="Entry Time" /></td>
                        <td><FormattedTime value={startTimeDate} /></td>
                    </tr>
                    {ended &&
                    <tr>
                        <td><M m="Exit Time" /></td>
                        <td><FormattedTime value={endTimeDate} /></td>
                    </tr>}
                </table>
                {ended && profit ? <p><M m="You won! Keep it up!" /></p> : <p><M m="This contract lost" /></p>}
            </div>
        );
    }
}
