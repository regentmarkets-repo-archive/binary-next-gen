import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Link } from 'react-router';
import M from '../_common/M';
import RangeGroup from '../_common/RangeGroup';
import NumberPlain from '../_common/NumberPlain';
import tradeToFriendlyType from 'binary-utils/lib/tradeToFriendlyType';

export default class TickTradeParameters extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        assets: PropTypes.array.isRequired,
        currency: PropTypes.string.isRequired,
        durationChange: PropTypes.func,
        index: PropTypes.number.isRequired,
        trade: PropTypes.object.isRequired,
    };

    render() {
        const { assets, currency, durationChange, index, trade } = this.props;
        const tradeTypeText = tradeToFriendlyType(trade.type, trade.barrier);
        const tradeAsset = assets.find(a => a.value === trade.symbol);

        return (
            <div className="trade-parameters">
                <div className="row">
                    <fieldset>
                        <label>
                            <M m="Asset" />
                        </label>
                        <br />
                        <Link
                            className="btn-secondary"
                            to={{
                                pathname: `/asset-picker/${index}`,
                                query: { type: 'tick' },
                            }}
                        >
                            {tradeAsset && tradeAsset.text}
                        </Link>
                    </fieldset>
                    <fieldset>
                        <label>
                            <M m="Type" />
                        </label>
                        <br />
                        <Link
                            className="btn-secondary"
                            to={`/trade-type-picker/${index}`}
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
                            to={{
                                pathname: `/payout-picker/${index}`,
                                query: currency,
                            }}
                        >
                            <M m={trade.basis.toUpperCase()} /><span>: </span>
                            <NumberPlain currency={currency} value={trade.amount} />
                        </Link>
                    </fieldset>
                </div>
            </div>
        );
    }
}
