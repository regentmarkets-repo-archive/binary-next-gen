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
                        <span id="pricingtable_underlying_div">
                            <select id="pricingtable_underlying" name="underlying" style="width: 100%">

                    <optgroup label="Forex">

                        <option class="" value="frxAUDJPY">
                            AUD/JPY
                        </option>

                        <option class="" value="frxAUDUSD">
                            AUD/USD
                        </option>

                        <option class="" value="frxEURAUD">
                            EUR/AUD
                        </option>

                        <option class="" value="frxEURCAD">
                            EUR/CAD
                        </option>

                        <option class="" value="frxEURGBP">
                            EUR/GBP
                        </option>

                        <option class="" value="frxEURJPY">
                            EUR/JPY
                        </option>

                        <option class="" value="frxEURUSD">
                            EUR/USD
                        </option>

                        <option class="" value="frxGBPAUD">
                            GBP/AUD
                        </option>

                        <option class="" value="frxGBPCAD">
                            GBP/CAD
                        </option>

                        <option class="" value="frxGBPJPY">
                            GBP/JPY
                        </option>

                        <option class="" value="frxGBPUSD">
                            GBP/USD
                        </option>

                        <option class="" value="frxNZDUSD">
                            NZD/USD
                        </option>

                        <option class="" value="frxUSDCAD">
                            USD/CAD
                        </option>

                        <option class="" value="frxUSDJPY">
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

                        <option class="" value="SPC">
                            US Index
                        </option>

                        <option class="" value="DJI">
                            Wall Street Index
                        </option>

                    </optgroup>

                    <optgroup label="Commodities">

                        <option class="" value="frxXAUUSD">
                            Gold/USD
                        </option>

                        <option class="" value="frxXAGUSD">
                            Silver/USD
                        </option>

                    </optgroup>

                    <optgroup label="Randoms">

                        <option class="" value="R_100">
                            Random 100 Index
                        </option>

                        <option class="" value="R_25">
                            Random 25 Index
                        </option>

                        <option class="" value="R_50">
                            Random 50 Index
                        </option>

                        <option class="" value="R_75">
                            Random 75 Index
                        </option>

                        <option class="" value="RDBEAR">
                            Random Bear
                        </option>

                        <option class="" value="RDBULL">
                            Random Bull
                        </option>

                        <option class="" value="RDMARS">
                            Random Mars
                        </option>

                        <option class="" value="RDMOON">
                            Random Moon
                        </option>

                        <option class="" value="RDSUN">
                            Random Sun
                        </option>

                        <option class="" value="RDVENUS">
                            Random Venus
                        </option>

                        <option class="" value="RDYANG">
                            Random Yang
                        </option>

                        <option class="" value="RDYIN">
                            Random Yin
                        </option>

                    </optgroup>

            </select>
                        </span>
                    </fieldset>

                    <fieldset>
                        <label for="pricingtable_currency">Payout Currency:</label>
                        <select id="pricingtable_currency" name="currency">

                            <option value="USD" selected=""> USD </option>

                            <option value="EUR"> EUR </option>

                            <option value="GBP"> GBP </option>

                            <option value="AUD"> AUD </option>

                        </select>
                    </fieldset>




                    <fieldset id="lower_strike" style="display:none;">
                        <label for="low_strike">Low barrier:</label>
                        <input size="5" type="text" id="low_strike" name="low_strike" value="86.022" style="background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4EaVTO26DQBD1ohQWaS2lg9JybZ+AK7hNwx2oIoVf4UPQ0Lj1FdKktevIpel8AKNUkDcWMxpgSaIEaTVv3sx7uztiTdu2s/98DywOw3Dued4Who/M2aIx5lZV1aEsy0+qiwHELyi+Ytl0PQ69SxAxkWIA4RMRTdNsKE59juMcuZd6xIAFeZ6fGCdJ8kY4y7KAuTRNGd7jyEBXsdOPE3a0QGPsniOnnYMO67LgSQN9T41F2QGrQRRFCwyzoIF2qyBuKKbcOgPXdVeY9rMWgNsjf9ccYesJhk3f5dYT1HX9gR0LLQR30TnjkUEcx2uIuS4RnI+aj6sJR0AM8AaumPaM/rRehyWhXqbFAA9kh3/8/NvHxAYGAsZ/il8IalkCLBfNVAAAAABJRU5ErkJggg==); background-attachment: scroll; background-position: 100% 50%; background-repeat: no-repeat;">
                        <span>(Absolute barrier)</span>
                    </fieldset>

                    <fieldset>
                        <label>Horizontal:</label>
                        <label id="strike_label">Barrier</label>
                        <label id="high_strike_label" style="display:none;">High barrier</label>
                    </fieldset>

                    <fieldset>
                        <label for="from_strike" id="from_strike_percent">From (%):</label>
                        <label for="from_strike" id="from_strike_label" style="display:none;">From:</label>
                        <input size="5" type="text" id="from_strike" name="from_strike" value="95">
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
                        <input size="9" type="text" id="from_expiry" name="from_expiry" value="2015-07-31" readonly="" class="picker__input" aria-haspopup="true" aria-expanded="false" aria-readonly="false" aria-owns="from_expiry_root"><div class="picker" id="from_expiry_root" aria-hidden="true"><div class="picker__holder" tabindex="-1"><div class="picker__frame"><div class="picker__wrap"><div class="picker__box"><div class="picker__header"><div class="picker__month">July</div><div class="picker__year">2015</div><div class="picker__nav--prev" data-nav="-1" role="button" aria-controls="from_expiry_table" title="Previous month"> </div><div class="picker__nav--next" data-nav="1" role="button" aria-controls="from_expiry_table" title="Next month"> </div></div><table class="picker__table" id="from_expiry_table" role="grid" aria-controls="from_expiry" aria-readonly="true"><thead><tr><th class="picker__weekday" scope="col" title="Moonday">Mo</th><th class="picker__weekday" scope="col" title="Tuesday">Tu</th><th class="picker__weekday" scope="col" title="Wednesday">We</th><th class="picker__weekday" scope="col" title="Thursday">Th</th><th class="picker__weekday" scope="col" title="Friday">Fr</th><th class="picker__weekday" scope="col" title="Saturday">Sa</th><th class="picker__weekday" scope="col" title="Sunday">Su</th></tr></thead><tbody><tr><td role="presentation"><div class="picker__day picker__day--outfocus" data-pick="1435525200000" role="gridcell" aria-label="29 June, 2015">29</div></td><td role="presentation"><div class="picker__day picker__day--outfocus" data-pick="1435611600000" role="gridcell" aria-label="30 June, 2015">30</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1435698000000" role="gridcell" aria-label="1 July, 2015">1</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1435784400000" role="gridcell" aria-label="2 July, 2015">2</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1435870800000" role="gridcell" aria-label="3 July, 2015">3</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1435957200000" role="gridcell" aria-label="4 July, 2015">4</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1436043600000" role="gridcell" aria-label="5 July, 2015">5</div></td></tr><tr><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1436130000000" role="gridcell" aria-label="6 July, 2015">6</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1436216400000" role="gridcell" aria-label="7 July, 2015">7</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1436302800000" role="gridcell" aria-label="8 July, 2015">8</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1436389200000" role="gridcell" aria-label="9 July, 2015">9</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1436475600000" role="gridcell" aria-label="10 July, 2015">10</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1436562000000" role="gridcell" aria-label="11 July, 2015">11</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1436648400000" role="gridcell" aria-label="12 July, 2015">12</div></td></tr><tr><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1436734800000" role="gridcell" aria-label="13 July, 2015">13</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1436821200000" role="gridcell" aria-label="14 July, 2015">14</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1436907600000" role="gridcell" aria-label="15 July, 2015">15</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1436994000000" role="gridcell" aria-label="16 July, 2015">16</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1437080400000" role="gridcell" aria-label="17 July, 2015">17</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1437166800000" role="gridcell" aria-label="18 July, 2015">18</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1437253200000" role="gridcell" aria-label="19 July, 2015">19</div></td></tr><tr><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1437339600000" role="gridcell" aria-label="20 July, 2015">20</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1437426000000" role="gridcell" aria-label="21 July, 2015">21</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1437512400000" role="gridcell" aria-label="22 July, 2015">22</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1437598800000" role="gridcell" aria-label="23 July, 2015">23</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1437685200000" role="gridcell" aria-label="24 July, 2015">24</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1437771600000" role="gridcell" aria-label="25 July, 2015">25</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1437858000000" role="gridcell" aria-label="26 July, 2015">26</div></td></tr><tr><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1437944400000" role="gridcell" aria-label="27 July, 2015">27</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1438030800000" role="gridcell" aria-label="28 July, 2015">28</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1438117200000" role="gridcell" aria-label="29 July, 2015">29</div></td><td role="presentation"><div class="picker__day picker__day--infocus picker__day--today picker__day--selected picker__day--highlighted" data-pick="1438203600000" role="gridcell" aria-label="30 July, 2015" aria-activedescendant="true">30</div></td><td role="presentation"><div class="picker__day picker__day--infocus" data-pick="1438290000000" role="gridcell" aria-label="31 July, 2015">31</div></td><td role="presentation"><div class="picker__day picker__day--outfocus" data-pick="1438376400000" role="gridcell" aria-label="1 August, 2015">1</div></td><td role="presentation"><div class="picker__day picker__day--outfocus" data-pick="1438462800000" role="gridcell" aria-label="2 August, 2015">2</div></td></tr><tr><td role="presentation"><div class="picker__day picker__day--outfocus" data-pick="1438549200000" role="gridcell" aria-label="3 August, 2015">3</div></td><td role="presentation"><div class="picker__day picker__day--outfocus" data-pick="1438635600000" role="gridcell" aria-label="4 August, 2015">4</div></td><td role="presentation"><div class="picker__day picker__day--outfocus" data-pick="1438722000000" role="gridcell" aria-label="5 August, 2015">5</div></td><td role="presentation"><div class="picker__day picker__day--outfocus" data-pick="1438808400000" role="gridcell" aria-label="6 August, 2015">6</div></td><td role="presentation"><div class="picker__day picker__day--outfocus" data-pick="1438894800000" role="gridcell" aria-label="7 August, 2015">7</div></td><td role="presentation"><div class="picker__day picker__day--outfocus" data-pick="1438981200000" role="gridcell" aria-label="8 August, 2015">8</div></td><td role="presentation"><div class="picker__day picker__day--outfocus" data-pick="1439067600000" role="gridcell" aria-label="9 August, 2015">9</div></td></tr></tbody></table><div class="picker__footer"><button class="picker__button--today" type="button" data-pick="1438203600000" disabled="" aria-controls="from_expiry">Today</button><button class="picker__button--clear" type="button" data-clear="1" disabled="" aria-controls="from_expiry">Clear</button><button class="picker__button--close" type="button" data-close="true" disabled="" aria-controls="from_expiry">Close</button></div></div></div></div></div></div><input type="hidden" name="from_expiry_submit" value="2015/07/30">
                    </fieldset>

                    <fieldset class="strike-step">
                        <label for="strike_step">Step (%):</label>
                        <div class="row">
                            <div>
                                <input size="13" type="text" name="strike_step" id="strike_step" value="1">
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

                <input type="hidden" value="price" name="action">
                <input type="hidden" class="pulser" id="calculating" value="Calculating">
                <p>
                    <button id="pricingtable_calculate" class="button" value="calculate" type="submit">Calculate</button>
                    <button style="display:none;" id="pricingtable_calculating" class="button pulser" value="calculating" type="submit">Calculating</button>
                </p>
            </form>
        );
    }
}
