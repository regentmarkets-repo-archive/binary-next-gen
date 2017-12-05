import React from 'react';
import { shallow } from 'enzyme';
import { mountWithIntl } from 'enzyme-react-intl';
import SetCurrency from '../SetCurrency';

describe('<SetCurrency />', () => {

    it('Component should be rendered', () => {
        const PROPS = {
            account: {},
        };
        const wrapper = shallow(<SetCurrency {...PROPS} />);

        expect(wrapper.type()).toBeDefined();
    });

    it('Component should be rendered with currencyOptions', () => {
        const PROPS = {
            account: {
                available_currencies: [{"fractional_digits":2,"stake_default":0.35,"type":"fiat","text":"EUR","value":"EUR","group":"fiatCurrency","img":"/img/eur.svg"},{"fractional_digits":2,"stake_default":0.35,"type":"fiat","text":"GBP","value":"GBP","group":"fiatCurrency","img":"/img/gbp.svg"},{"fractional_digits":2,"stake_default":0.35,"type":"fiat","text":"USD","value":"USD","group":"fiatCurrency","img":"/img/usd.svg"}]
            },
        }
        const wrapper = shallow(<SetCurrency {...PROPS} />);

        expect(wrapper.type()).toBeDefined();
    });

    it('currencyOptions should exist when available_currencies are passed in account', () => {
        const account = {
            available_currencies: [
                {"fractional_digits":2,"stake_default":0.35,"type":"fiat",
                    "text":"EUR","value":"EUR","group":"fiatCurrency","img":"/img/eur.svg"},
                {"fractional_digits":2,"stake_default":0.35,"type":"fiat",
                    "text":"GBP","value":"GBP","group":"fiatCurrency","img":"/img/gbp.svg"},
                {"fractional_digits":2,"stake_default":0.35,"type":"fiat",
                    "text":"USD","value":"USD","group":"fiatCurrency","img":"/img/usd.svg"}
            ]
        };
        const wrapper = shallow(<SetCurrency account={account} />);

        expect(wrapper.find('.set-currency-select').exists());
    });

    it('Radio selector should be rendered with currencyOptions', () => {
        const account = {
            available_currencies: [
                {"fractional_digits":2,"stake_default":0.35,"type":"fiat",
                    "text":"EUR","value":"EUR","group":"fiatCurrency","img":"/img/eur.svg"},
                {"fractional_digits":2,"stake_default":0.35,"type":"fiat",
                    "text":"GBP","value":"GBP","group":"fiatCurrency","img":"/img/gbp.svg"},
                {"fractional_digits":2,"stake_default":0.35,"type":"fiat",
                    "text":"USD","value":"USD","group":"fiatCurrency","img":"/img/usd.svg"}
            ]
        };
        const wrapper = mountWithIntl(<SetCurrency account={account} />);

        expect(wrapper.find('.radio-selector').exists());
    });
});
