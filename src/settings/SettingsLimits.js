import React, { PureComponent } from 'react';
import { M, Notice, Td, NumberPlain } from 'binary-components';

export default class SettingsLimits extends PureComponent {
    props: {
        account_balance: number,
        withdrawal_for_x_days_monetary: number,
        open_positions: number,
        lifetime_limit: number,
        market_specific: object,
        payout: number,
    };

    render() {
        const {
            account_balance,
            withdrawal_for_x_days_monetary,
            open_positions,
            lifetime_limit,
            market_specific,
            payout,
        } = this.props;
        const marketLimits = [].concat(...Object.values(market_specific));

        return (
            <div className="settings-limits">
                <h5><M m="Trading Limits" /></h5>
                <table>
                    <thead><tr /></thead>
                    <tbody>
                        <tr>
                            <Td text="Maximum number of open positions" />
                            <td className="numeric">
                                <NumberPlain
                                    value={open_positions}
                                    digits={0}
                                />
                            </td>
                        </tr>
                        <tr>
                            <Td text="Maximum account cash balance" />
                            <td className="numeric">
                                <NumberPlain
                                    value={account_balance}
                                    digits={0}
                                />
                            </td>
                        </tr>
                        <tr>
                            <Td text="Maximum aggregate payouts on open positions" />
                            <td className="numeric">
                                <NumberPlain value={payout} digits={0} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h5><M m="Maximum Daily Turnover" /></h5>
                <table>
                    <thead><tr /></thead>
                    <tbody>
                        {marketLimits.map(x => (
                            <tr key={x.name}>
                                <Td text={x.name} />
                                <td className="numeric">
                                    <NumberPlain
                                        value={x.turnover_limit}
                                        digits={0}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Notice text="Stated limits are subject to change without prior notice" />
                <h5><M m="Withdrawal Limits" /></h5>
                <table>
                    <thead><tr /></thead>
                    <tbody>
                        <tr>
                            <Td text="Withdrawal limit" />
                            <td className="numeric">
                                <NumberPlain
                                    value={lifetime_limit}
                                    digits={0}
                                />
                            </td>
                        </tr>
                        <tr>
                            <Td text="Already withdrawn" />
                            <td className="numeric">
                                <NumberPlain
                                    value={withdrawal_for_x_days_monetary}
                                    digits={0}
                                />
                            </td>
                        </tr>
                        <tr>
                            <Td text="Current immediate maximum withdrawal" />
                            <td className="numeric">
                                <NumberPlain
                                    value={lifetime_limit}
                                    digits={0}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
