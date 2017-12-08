import React from 'react';
import { shallow } from 'enzyme';
import ExistingAccounts from '../ExistingAccounts';

describe('<ExistingAccounts />', () => {
    it('should render with empty props', () => {
        const loginid = '';
        const existingAccounts = [];
        const wrapper = shallow(<ExistingAccounts
            loginid={loginid}
            existingAccounts={existingAccounts} />);

        expect(wrapper.type()).toBeDefined();
    });

    it('should render button when current account has no currency', () => {
        const loginid = 'CR67890';
        const existingAccounts = [
            {
                id: 'VRTC12345',
                type: 'Virtual',
                availableMarkets: 'Commodities, Forex, Indices, Stocks, Volatility Indices',
                currency: 'USD'
            },
            {
                id: 'CR12345',
                type: 'real',
                availableMarkets: 'Commodities, Forex, Indices, Stocks, Volatility Indices',
                currency: 'AUD'
            },
            {
                id: 'CR67890',
                type: 'real',
                availableMarkets: 'Commodities, Forex, Indices, Stocks, Volatility Indices',
                currency: ''
            }
        ];

        const wrapper = shallow(<ExistingAccounts
            loginid={loginid}
            existingAccounts={existingAccounts} />);

        const selectCurrencyButton = wrapper.find('#select-currency-button');
        expect(selectCurrencyButton.length).toEqual(1);
    });

    it('should not render button when current account has no currency', () => {
        const loginid = 'CR67890';
        const existingAccounts = [
            {
                id: 'VRTC12345',
                type: 'Virtual',
                availableMarkets: 'Commodities, Forex, Indices, Stocks, Volatility Indices',
                currency: 'USD'
            },
            {
                id: 'CR12345',
                type: 'real',
                availableMarkets: 'Commodities, Forex, Indices, Stocks, Volatility Indices',
                currency: 'AUD'
            },
            {
                id: 'CR67890',
                type: 'real',
                availableMarkets: 'Commodities, Forex, Indices, Stocks, Volatility Indices',
                currency: 'BTC'
            }
        ];

        const wrapper = shallow(<ExistingAccounts
            loginid={loginid}
            existingAccounts={existingAccounts} />);

        const selectCurrencyButton = wrapper.find('#select-currency-button');
        expect(selectCurrencyButton.length).toEqual(0);
    });

    it('should not render button when there is account without currency but they"re not current account', () => {
        const loginid = 'VRTC12345';
        const existingAccounts = [
            {
                id: 'VRTC12345',
                type: 'Virtual',
                availableMarkets: 'Commodities, Forex, Indices, Stocks, Volatility Indices',
                currency: 'USD'
            },
            {
                id: 'CR12345',
                type: 'real',
                availableMarkets: 'Commodities, Forex, Indices, Stocks, Volatility Indices',
                currency: ''
            },
            {
                id: 'CR67890',
                type: 'real',
                availableMarkets: 'Commodities, Forex, Indices, Stocks, Volatility Indices',
                currency: ''
            }
        ];

        const wrapper = shallow(<ExistingAccounts
            loginid={loginid}
            existingAccounts={existingAccounts} />);

        const selectCurrencyButton = wrapper.find('#select-currency-button');
        expect(selectCurrencyButton.length).toEqual(0);
    });

});
