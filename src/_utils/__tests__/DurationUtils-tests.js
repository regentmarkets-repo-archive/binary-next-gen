import * as DurationUtils from '../DurationUtils';
import { expect } from 'chai';

/**
 *  Duration refer to string with digit follow by duration unit
 *  eg. '5h', '2t' ...
 */

describe('isDurationWithinRange', () => {
    it('should return true if duration is within range', () => {
        const duration = '20';
        const unit = 's';
        const range = [{ unit: 's', min: 10, max: 365}];

        expect(DurationUtils.isDurationWithinRange(duration, unit, range)).to.be.true;
    });

    it('should return false if duration is not within range', () => {
        const duration = '2000';
        const unit = 's';
        const range = [{ unit: 's', min: 10, max: 365}];

        expect(DurationUtils.isDurationWithinRange(duration, unit, range)).to.be.false;
    });
});

describe('extractMinMaxInUnits', () => {
    it('should return array of objects with [unit, min, max] as key', () => {
        const minS = 50;
        const maxS = 500;
        const durations = DurationUtils.extractMinMaxInUnits(minS, maxS);
        expect(durations.length === 2).to.be.true;

        expect(durations[0].unit === 's').to.be.true;
        expect(durations[0].min === 50).to.be.true;
        expect(durations[0].max === 500).to.be.true;
    });

    it('should not return objects with max <= 1', () => {
        const minS = 5;
        const maxS = 5000;
        const durations = DurationUtils.extractMinMaxInUnits(minS, maxS);
        expect(durations.some(d => d.unit === 'd')).to.be.false;
    });

});

describe('extractDurationHelper', () => {
    const realContractsFromServer = [
        {
            "contract_display": "asian up",
            "market": "random",
            "max_contract_duration": "10t",
            "payout_limit": "10000",
            "barrier_category": "asian",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "contract_category_display": "Asians",
            "contract_type": "ASIANU",
            "min_contract_duration": "5t",
            "sentiment": "up",
            "barriers": 0,
            "contract_category": "asian",
            "start_type": "spot",
            "expiry_type": "tick",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "asian down",
            "market": "random",
            "max_contract_duration": "10t",
            "payout_limit": "10000",
            "barrier_category": "asian",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "contract_category_display": "Asians",
            "contract_type": "ASIAND",
            "min_contract_duration": "5t",
            "sentiment": "down",
            "barriers": 0,
            "contract_category": "asian",
            "start_type": "spot",
            "expiry_type": "tick",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "higher",
            "market": "random",
            "min_contract_duration": "1d",
            "max_contract_duration": "365d",
            "sentiment": "up",
            "barriers": 0,
            "contract_category": "callput",
            "start_type": "spot",
            "barrier_category": "euro_atm",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "expiry_type": "daily",
            "underlying_symbol": "R_50",
            "contract_category_display": "Up/Down",
            "contract_type": "CALL"
        },
        {
            "contract_display": "lower",
            "market": "random",
            "min_contract_duration": "1d",
            "max_contract_duration": "365d",
            "sentiment": "down",
            "barriers": 0,
            "contract_category": "callput",
            "start_type": "spot",
            "barrier_category": "euro_atm",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "expiry_type": "daily",
            "underlying_symbol": "R_50",
            "contract_category_display": "Up/Down",
            "contract_type": "PUT"
        },
        {
            "contract_display": "higher",
            "market": "random",
            "max_contract_duration": "365d",
            "barrier": "+11.7064",
            "barrier_category": "euro_non_atm",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "contract_category_display": "Up/Down",
            "contract_type": "CALL",
            "min_contract_duration": "1d",
            "sentiment": "up",
            "barriers": 1,
            "contract_category": "callput",
            "start_type": "spot",
            "expiry_type": "daily",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "lower",
            "market": "random",
            "max_contract_duration": "365d",
            "barrier": "+11.7064",
            "barrier_category": "euro_non_atm",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "contract_category_display": "Up/Down",
            "contract_type": "PUT",
            "min_contract_duration": "1d",
            "sentiment": "down",
            "barriers": 1,
            "contract_category": "callput",
            "start_type": "spot",
            "expiry_type": "daily",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "higher",
            "market": "random",
            "max_contract_duration": "1d",
            "barrier_category": "euro_atm",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "contract_category_display": "Up/Down",
            "contract_type": "CALL",
            "min_contract_duration": "2m",
            "sentiment": "up",
            "barriers": 0,
            "contract_category": "callput",
            "start_type": "forward",
            "expiry_type": "intraday",
            "underlying_symbol": "R_50",
            "forward_starting_options": [
                {
                    "open": 1455753600,
                    "close": 1455839999,
                    "date": 1455753600
                },
                {
                    "open": 1455840000,
                    "close": 1455926399,
                    "date": 1455840000
                },
                {
                    "open": 1455926400,
                    "close": 1456012799,
                    "date": 1455926400
                }
            ]
        },
        {
            "contract_display": "lower",
            "market": "random",
            "max_contract_duration": "1d",
            "barrier_category": "euro_atm",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "contract_category_display": "Up/Down",
            "contract_type": "PUT",
            "min_contract_duration": "2m",
            "sentiment": "down",
            "barriers": 0,
            "contract_category": "callput",
            "start_type": "forward",
            "expiry_type": "intraday",
            "underlying_symbol": "R_50",
            "forward_starting_options": [
                {
                    "open": 1455753600,
                    "close": 1455839999,
                    "date": 1455753600
                },
                {
                    "open": 1455840000,
                    "close": 1455926399,
                    "date": 1455840000
                },
                {
                    "open": 1455926400,
                    "close": 1456012799,
                    "date": 1455926400
                }
            ]
        },
        {
            "contract_display": "higher",
            "market": "random",
            "min_contract_duration": "15s",
            "max_contract_duration": "1d",
            "sentiment": "up",
            "barriers": 0,
            "contract_category": "callput",
            "start_type": "spot",
            "barrier_category": "euro_atm",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "expiry_type": "intraday",
            "underlying_symbol": "R_50",
            "contract_category_display": "Up/Down",
            "contract_type": "CALL"
        },
        {
            "contract_display": "lower",
            "market": "random",
            "min_contract_duration": "15s",
            "max_contract_duration": "1d",
            "sentiment": "down",
            "barriers": 0,
            "contract_category": "callput",
            "start_type": "spot",
            "barrier_category": "euro_atm",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "expiry_type": "intraday",
            "underlying_symbol": "R_50",
            "contract_category_display": "Up/Down",
            "contract_type": "PUT"
        },
        {
            "contract_display": "higher",
            "market": "random",
            "max_contract_duration": "1d",
            "barrier": "+0.4252",
            "barrier_category": "euro_non_atm",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "contract_category_display": "Up/Down",
            "contract_type": "CALL",
            "min_contract_duration": "2m",
            "sentiment": "up",
            "barriers": 1,
            "contract_category": "callput",
            "start_type": "spot",
            "expiry_type": "intraday",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "lower",
            "market": "random",
            "max_contract_duration": "1d",
            "barrier": "+0.4252",
            "barrier_category": "euro_non_atm",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "contract_category_display": "Up/Down",
            "contract_type": "PUT",
            "min_contract_duration": "2m",
            "sentiment": "down",
            "barriers": 1,
            "contract_category": "callput",
            "start_type": "spot",
            "expiry_type": "intraday",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "higher",
            "market": "random",
            "min_contract_duration": "5t",
            "max_contract_duration": "10t",
            "sentiment": "up",
            "barriers": 0,
            "contract_category": "callput",
            "start_type": "spot",
            "barrier_category": "euro_atm",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "expiry_type": "tick",
            "underlying_symbol": "R_50",
            "contract_category_display": "Up/Down",
            "contract_type": "CALL"
        },
        {
            "contract_display": "lower",
            "market": "random",
            "min_contract_duration": "5t",
            "max_contract_duration": "10t",
            "sentiment": "down",
            "barriers": 0,
            "contract_category": "callput",
            "start_type": "spot",
            "barrier_category": "euro_atm",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "expiry_type": "tick",
            "underlying_symbol": "R_50",
            "contract_category_display": "Up/Down",
            "contract_type": "PUT"
        },
        {
            "contract_display": "matches",
            "market": "random",
            "max_contract_duration": "10t",
            "barrier_category": "non_financial",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "contract_category_display": "Digits",
            "last_digit_range": [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9
            ],
            "contract_type": "DIGITMATCH",
            "min_contract_duration": "5t",
            "sentiment": "match",
            "barriers": 1,
            "contract_category": "digits",
            "start_type": "spot",
            "expiry_type": "tick",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "differs",
            "market": "random",
            "max_contract_duration": "10t",
            "barrier_category": "non_financial",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "contract_category_display": "Digits",
            "last_digit_range": [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9
            ],
            "contract_type": "DIGITDIFF",
            "min_contract_duration": "5t",
            "sentiment": "differ",
            "barriers": 1,
            "contract_category": "digits",
            "start_type": "spot",
            "expiry_type": "tick",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "odd",
            "market": "random",
            "min_contract_duration": "5t",
            "max_contract_duration": "10t",
            "sentiment": "odd",
            "barriers": 0,
            "contract_category": "digits",
            "start_type": "spot",
            "barrier_category": "non_financial",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "expiry_type": "tick",
            "underlying_symbol": "R_50",
            "contract_category_display": "Digits",
            "contract_type": "DIGITODD"
        },
        {
            "contract_display": "even",
            "market": "random",
            "min_contract_duration": "5t",
            "max_contract_duration": "10t",
            "sentiment": "even",
            "barriers": 0,
            "contract_category": "digits",
            "start_type": "spot",
            "barrier_category": "non_financial",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "expiry_type": "tick",
            "underlying_symbol": "R_50",
            "contract_category_display": "Digits",
            "contract_type": "DIGITEVEN"
        },
        {
            "contract_display": "over",
            "market": "random",
            "max_contract_duration": "10t",
            "barrier_category": "non_financial",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "contract_category_display": "Digits",
            "last_digit_range": [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ],
            "contract_type": "DIGITOVER",
            "min_contract_duration": "5t",
            "sentiment": "over",
            "barriers": 1,
            "contract_category": "digits",
            "start_type": "spot",
            "expiry_type": "tick",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "under",
            "market": "random",
            "max_contract_duration": "10t",
            "barrier_category": "non_financial",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "contract_category_display": "Digits",
            "last_digit_range": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9
            ],
            "contract_type": "DIGITUNDER",
            "min_contract_duration": "5t",
            "sentiment": "under",
            "barriers": 1,
            "contract_category": "digits",
            "start_type": "spot",
            "expiry_type": "tick",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "ends outside",
            "market": "random",
            "high_barrier": "+11.7064",
            "max_contract_duration": "365d",
            "barrier_category": "euro_non_atm",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "low_barrier": -11.1007,
            "contract_category_display": "Ends In/Out",
            "contract_type": "EXPIRYMISS",
            "min_contract_duration": "1d",
            "sentiment": "high_vol",
            "barriers": 2,
            "contract_category": "endsinout",
            "start_type": "spot",
            "expiry_type": "daily",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "ends between",
            "market": "random",
            "high_barrier": "+11.7064",
            "max_contract_duration": "365d",
            "barrier_category": "euro_non_atm",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "low_barrier": -11.1007,
            "contract_category_display": "Ends In/Out",
            "contract_type": "EXPIRYRANGE",
            "min_contract_duration": "1d",
            "sentiment": "low_vol",
            "barriers": 2,
            "contract_category": "endsinout",
            "start_type": "spot",
            "expiry_type": "daily",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "ends outside",
            "market": "random",
            "high_barrier": "+0.4252",
            "max_contract_duration": "1d",
            "barrier_category": "euro_non_atm",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "low_barrier": -0.4244,
            "contract_category_display": "Ends In/Out",
            "contract_type": "EXPIRYMISS",
            "min_contract_duration": "2m",
            "sentiment": "high_vol",
            "barriers": 2,
            "contract_category": "endsinout",
            "start_type": "spot",
            "expiry_type": "intraday",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "ends between",
            "market": "random",
            "high_barrier": "+0.4252",
            "max_contract_duration": "1d",
            "barrier_category": "euro_non_atm",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "low_barrier": -0.4244,
            "contract_category_display": "Ends In/Out",
            "contract_type": "EXPIRYRANGE",
            "min_contract_duration": "2m",
            "sentiment": "low_vol",
            "barriers": 2,
            "contract_category": "endsinout",
            "start_type": "spot",
            "expiry_type": "intraday",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "spread up",
            "market": "random",
            "max_contract_duration": "10",
            "barrier_category": "spreads",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "stop_profit": 10,
            "contract_category_display": "Spreads",
            "contract_type": "SPREADU",
            "stop_loss": 10,
            "min_contract_duration": "5",
            "sentiment": "up",
            "barriers": 0,
            "contract_category": "spreads",
            "start_type": "spot",
            "expiry_type": "intraday",
            "underlying_symbol": "R_50",
            "stop_type": "point",
            "amount_per_point": 1
        },
        {
            "contract_display": "spread down",
            "market": "random",
            "max_contract_duration": "10",
            "barrier_category": "spreads",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "stop_profit": 10,
            "contract_category_display": "Spreads",
            "contract_type": "SPREADD",
            "stop_loss": 10,
            "min_contract_duration": "5",
            "sentiment": "down",
            "barriers": 0,
            "contract_category": "spreads",
            "start_type": "spot",
            "expiry_type": "intraday",
            "underlying_symbol": "R_50",
            "stop_type": "point",
            "amount_per_point": 1
        },
        {
            "contract_display": "stays between",
            "market": "random",
            "high_barrier": "+11.7064",
            "max_contract_duration": "365d",
            "barrier_category": "american",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "low_barrier": -11.1007,
            "contract_category_display": "Stays In/Goes Out",
            "contract_type": "RANGE",
            "min_contract_duration": "1d",
            "sentiment": "low_vol",
            "barriers": 2,
            "contract_category": "staysinout",
            "start_type": "spot",
            "expiry_type": "daily",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "goes outside",
            "market": "random",
            "high_barrier": "+11.7064",
            "max_contract_duration": "365d",
            "barrier_category": "american",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "low_barrier": -11.1007,
            "contract_category_display": "Stays In/Goes Out",
            "contract_type": "UPORDOWN",
            "min_contract_duration": "1d",
            "sentiment": "high_vol",
            "barriers": 2,
            "contract_category": "staysinout",
            "start_type": "spot",
            "expiry_type": "daily",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "stays between",
            "market": "random",
            "high_barrier": "+0.4252",
            "max_contract_duration": "1d",
            "barrier_category": "american",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "low_barrier": -0.4244,
            "contract_category_display": "Stays In/Goes Out",
            "contract_type": "RANGE",
            "min_contract_duration": "2m",
            "sentiment": "low_vol",
            "barriers": 2,
            "contract_category": "staysinout",
            "start_type": "spot",
            "expiry_type": "intraday",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "goes outside",
            "market": "random",
            "high_barrier": "+0.4252",
            "max_contract_duration": "1d",
            "barrier_category": "american",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "low_barrier": -0.4244,
            "contract_category_display": "Stays In/Goes Out",
            "contract_type": "UPORDOWN",
            "min_contract_duration": "2m",
            "sentiment": "high_vol",
            "barriers": 2,
            "contract_category": "staysinout",
            "start_type": "spot",
            "expiry_type": "intraday",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "touches",
            "market": "random",
            "max_contract_duration": "365d",
            "barrier": "+11.7064",
            "barrier_category": "american",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "contract_category_display": "Touch/No Touch",
            "contract_type": "ONETOUCH",
            "min_contract_duration": "1d",
            "sentiment": "high_vol",
            "barriers": 1,
            "contract_category": "touchnotouch",
            "start_type": "spot",
            "expiry_type": "daily",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "does not touch",
            "market": "random",
            "max_contract_duration": "365d",
            "barrier": "+11.7064",
            "barrier_category": "american",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "contract_category_display": "Touch/No Touch",
            "contract_type": "NOTOUCH",
            "min_contract_duration": "1d",
            "sentiment": "low_vol",
            "barriers": 1,
            "contract_category": "touchnotouch",
            "start_type": "spot",
            "expiry_type": "daily",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "touches",
            "market": "random",
            "max_contract_duration": "1d",
            "barrier": "+0.4252",
            "barrier_category": "american",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "contract_category_display": "Touch/No Touch",
            "contract_type": "ONETOUCH",
            "min_contract_duration": "2m",
            "sentiment": "high_vol",
            "barriers": 1,
            "contract_category": "touchnotouch",
            "start_type": "spot",
            "expiry_type": "intraday",
            "underlying_symbol": "R_50"
        },
        {
            "contract_display": "does not touch",
            "market": "random",
            "max_contract_duration": "1d",
            "barrier": "+0.4252",
            "barrier_category": "american",
            "exchange_name": "RANDOM",
            "submarket": "random_index",
            "contract_category_display": "Touch/No Touch",
            "contract_type": "NOTOUCH",
            "min_contract_duration": "2m",
            "sentiment": "low_vol",
            "barriers": 1,
            "contract_category": "touchnotouch",
            "start_type": "spot",
            "expiry_type": "intraday",
            "underlying_symbol": "R_50"
        }
    ];
    it('should return empty array for spreads as spreads does not have duration', () => {
        const durationsForSpread = DurationUtils.extractDurationHelper(realContractsFromServer, 'SPREAD');
        expect(durationsForSpread).be.empty;
    });

    it('should return arrays of duration for non-spread type', () => {
        const durations = DurationUtils.extractDurationHelper(realContractsFromServer, 'CALL');
        expect(durations.length).equal(5);
    })
});