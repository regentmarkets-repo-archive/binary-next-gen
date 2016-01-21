import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Link } from 'react-router';
import { RangeGroup } from '../_common';
import { tradeToFriendlyType } from '../_utils/TradeUtils';
import { M, NumberPlain } from '../_common';

export default class TickTradeParameters extends React.Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        assets: PropTypes.array.isRequired,
        currency: PropTypes.string.isRequired,
        durationChange: PropTypes.func,
        id: PropTypes.string.isRequired,
        trade: PropTypes.object.isRequired,
    };

    render() {
        const { currency, durationChange, id, trade } = this.props;
        const tradeTypeText = tradeToFriendlyType(trade.type, trade.barrier);

        return (
            <div className="trade-parameters">
                <div className="row">
                    <fieldset>
                        <label>
                            <M m="Asset" />
                        </label>
                        <br />
                        <Link to={`/asset-picker/${id}`} query={{ type: 'tick' }} className="btn-secondary">
                            {trade.symbol}
                        </Link>
                    </fieldset>
                    <fieldset>
                        <label>
                            <M m="Type" />
                        </label>
                        <br />
                        <Link
                            className="btn-secondary"
                            to={`/trade-type-picker/${id}`}
                        >
                            <M m={tradeTypeText} />
                        </Link>
                    </fieldset>
                </div>
                <div className="row" style={{ marginTop: '1rem' }}>
                    <fieldset>
                        <label>
                            <M m="Ticks" />
                        </label>
                        <RangeGroup
                            min={5} max={10}
                            items={['5', '6', '7', '8', '9', '10']}
                            value={+trade.duration}
                            onChange={durationChange}
                        />
                    </fieldset>
                    <fieldset>
                        <label>
                            <M m="Amount" />
                        </label>
                        <br />
                        <Link
                            className="btn-secondary"
                            to={`/payout-picker/${id}`}
                            query={{ currency }}
                        >
                            <M m={trade.basis} /><span>: </span>
                            <NumberPlain currency={currency} value={trade.amount} />
                        </Link>
                    </fieldset>
                </div>
            </div>
        );
    }
}
