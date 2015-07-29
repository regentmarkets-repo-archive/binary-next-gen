import React from 'react';

export default class PricingTableFilter extends React.Component {
    render() {
        return (
            <form>
                <div className="row">
                    <fieldset>
                        <label for="pricingtable_bet_type">Contract Type:</label>
                        <select id="pricingtable_bet_type" name="bet_type">
                            <option value="CALL" selected="selected">Higher</option>
                            <option value="PUT">Lower</option>
                            <option value="ONETOUCH">Touches</option>
                            <option value="NOTOUCH">Does not touch</option>
                            <option value="RANGE">Stays between</option>
                            <option value="UPORDOWN">Goes outside</option>
                            <option value="EXPIRYRANGE">Ends between</option>
                            <option value="EXPIRYMISS">Ends outside</option>
                        </select>
                    </fieldset>

                    <fieldset>
                        <label for="pricingtable_underlying">Market:</label>
                        <select id="pricingtable_underlying" name="underlying" style={{width: '100%'}}>
                            <optgroup label="Forex">
                                <option value="frxAUDJPY">
                                    AUD/JPY
                                </option>
                                <option value="frxAUDUSD">
                                    AUD/USD
                                </option>
                                <option value="frxEURAUD">
                                    EUR/AUD
                                </option>
                                <option value="frxEURCAD">
                                    EUR/CAD
                                </option>
                                <option value="frxEURGBP">
                                    EUR/GBP
                                </option>
                                <option value="frxEURJPY">
                                    EUR/JPY
                                </option>
                                <option value="frxEURUSD">
                                    EUR/USD
                                </option>
                                <option value="frxGBPAUD">
                                    GBP/AUD
                                </option>
                                <option value="frxGBPCAD">
                                    GBP/CAD
                                </option>
                                <option value="frxGBPJPY">
                                    GBP/JPY
                                </option>
                                <option value="frxGBPUSD">
                                    GBP/USD
                                </option>
                                <option value="frxNZDUSD">
                                    NZD/USD
                                </option>
                                <option value="frxUSDCAD">
                                    USD/CAD
                                </option>
                                <option value="frxUSDJPY">
                                    USD/JPY
                                </option>
                            </optgroup>
                            <optgroup label="Indices">
                                <option class="gray" value="AS51">
                                    Australian Index
                                </option>
                                <option class="gray" value="AEX">
                                    Dutch Index
                                </option>
                                <option class="gray" value="SX5E">
                                    Euro 50 Index
                                </option>
                                <option class="gray" value="FCHI">
                                    French Index
                                </option>
                                <option class="gray" value="GDAXI">
                                    German Index
                                </option>
                                <option class="gray" value="HSI">
                                    Hong Kong Index
                                </option>
                                <option class="gray" value="N225">
                                    Japanese Index
                                </option>
                                <option class="gray" value="SSMI">
                                    Swiss Index
                                </option>
                                <option value="SPC">
                                    US Index
                                </option>
                                <option value="DJI">
                                    Wall Street Index
                                </option>
                            </optgroup>
                            <optgroup label="Commodities">
                                <option value="frxXAUUSD">
                                    Gold/USD
                                </option>
                                <option value="frxXAGUSD">
                                    Silver/USD
                                </option>
                            </optgroup>
                            <optgroup label="Randoms">
                                <option value="R_100">
                                    Random 100 Index
                                </option>
                                <option value="R_25">
                                    Random 25 Index
                                </option>
                                <option value="R_50">
                                    Random 50 Index
                                </option>
                                <option value="R_75">
                                    Random 75 Index
                                </option>
                                <option value="RDBEAR">
                                    Random Bear
                                </option>
                                <option value="RDBULL">
                                    Random Bull
                                </option>
                                <option value="RDMARS">
                                    Random Mars
                                </option>
                                <option value="RDMOON">
                                    Random Moon
                                </option>
                                <option value="RDSUN">
                                    Random Sun
                                </option>
                                <option value="RDVENUS">
                                    Random Venus
                                </option>
                                <option value="RDYANG">
                                    Random Yang
                                </option>
                                <option value="RDYIN">
                                    Random Yin
                                </option>
                            </optgroup>
                    </select>
                </fieldset>

                <fieldset>
                    <label for="pricingtable_currency">Payout Currency:</label>
                    <select id="pricingtable_currency" name="currency">
                        <option value="USD" selected="">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="AUD">AUD</option>
                    </select>
                </fieldset>

                <fieldset id="lower_strike">
                    <label for="low_strike">Low barrier:</label>
                    <input size="5" type="text" id="low_strike" name="low_strike" value="86.022" />
                    <span>(Absolute barrier)</span>
                </fieldset>

                <fieldset>
                    <label>Horizontal:</label>
                    <label id="strike_label">Barrier</label>
                    <label id="high_strike_label">High barrier</label>
                </fieldset>

                <fieldset>
                    <label for="from_strike" id="from_strike_percent">From (%):</label>
                    <label for="from_strike" id="from_strike_label">From:</label>
                    <input size="5" type="text" id="from_strike" name="from_strike" value="95" />
                </fieldset>

                <fieldset>
                    <label>Vertical:</label>
                    <label>Expiry</label>
                </fieldset>

                <fieldset>
                    <label for="expiry_step">Step:</label>
                    <select name="expiry_step" id="expiry_step">
                        <option value="Daily" selected="selected"> Daily </option>
                        <option value="Weekly"> Weekly </option>
                        <option value="Monthly"> Monthly </option>
                        <option value="Standard expiry"> Standard expiry </option>
                    </select>
                </fieldset>

                <fieldset>
                    <label for="from_expiry" id="from_expiry_label">From:</label>
                    <input size="9"
                        type="text"
                        id="from_expiry"
                        name="from_expiry"
                        value="2015-07-31"
                        class="picker__input" />
                </fieldset>

                <fieldset class="strike-step">
                    <label for="strike_step">Step (%):</label>
                    <div class="row">
                        <div>
                            <input size="13" type="text" name="strike_step" id="strike_step" value="1" />
                        </div>
                        <div>
                            <select id="strike_type" name="strike_type">
                                <option value="Moneyness terms" selected="selected">
                                    Moneyness terms
                                </option>
                                <option value="Barrier terms">
                                    Barrier terms
                                </option>
                            </select>
                        </div>
                    </div>
                </fieldset>
                </div>

                <p>
                    <button id="pricingtable_calculate" class="button" value="calculate" type="submit">Calculate</button>
                    <button id="pricingtable_calculating" class="button pulser" value="calculating" type="submit">Calculating</button>
                </p>
            </form>
        );
    }
}
