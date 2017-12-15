import activeMarkets from '../../_constants/ActiveMarkets';
import { getAllLoginids, getAccountType, isAccountOfType, hasAccountOfType, landingCompanyValue, getExistingCurrencies, groupCurrencies, filterMarkets, getExistingAccounts, populateCurrencyOptions } from '../Client';

describe('Client', () => {
    const landingCompany = {"financial_company":{"address":null,"country":"Costa Rica","has_reality_check":0,"legal_allowed_contract_categories":["asian","callput","digits","endsinout","staysinout","touchnotouch"],"legal_allowed_currencies":["AUD","BCH","BTC","ETH","EUR","GBP","LTC","USD"],"legal_allowed_markets":["commodities","forex","indices","stocks","volidx"],"legal_default_currency":"USD","name":"Binary (C.R.) S.A.","shortcode":"costarica"},"gaming_company":{"address":null,"country":"Costa Rica","has_reality_check":0,"legal_allowed_contract_categories":["asian","callput","digits","endsinout","staysinout","touchnotouch"],"legal_allowed_currencies":["AUD","BCH","BTC","ETH","EUR","GBP","LTC","USD"],"legal_allowed_markets":["commodities","forex","indices","stocks","volidx"],"legal_default_currency":"USD","name":"Binary (C.R.) S.A.","shortcode":"costarica"},"id":"br","mt_financial_company":{"address":["Govant Building","Port Vila","P.O. Box 1276","Vanuatu","Republic of Vanuatu"],"country":"Republic of Vanuatu","has_reality_check":0,"legal_allowed_contract_categories":["callput"],"legal_allowed_currencies":["USD"],"legal_allowed_markets":["forex"],"legal_default_currency":"USD","name":"Binary (V) Ltd","shortcode":"vanuatu"},"mt_gaming_company":{"address":null,"country":"Costa Rica","has_reality_check":0,"legal_allowed_contract_categories":["asian","callput","digits","endsinout","staysinout","touchnotouch"],"legal_allowed_currencies":["AUD","BCH","BTC","ETH","EUR","GBP","LTC","USD"],"legal_allowed_markets":["commodities","forex","indices","stocks","volidx"],"legal_default_currency":"USD","name":"Binary (C.R.) S.A.","shortcode":"costarica"},"name":"Brazil","virtual_company":"virtual"};

    const currencyConfig = {
        AUD: {fractional_digits: 2, stake_default: 0.35, type: "fiat"},
        BCH: {fractional_digits: 8, stake_default: 0.001, type: "crypto"},
        BTC: {fractional_digits: 8, stake_default: 0.0002, type: "crypto"},
        ETH: {fractional_digits: 8, stake_default: 0.002, type: "crypto"},
        EUR: {fractional_digits: 2, stake_default: 0.35, type: "fiat"},
        GBP: {fractional_digits: 2, stake_default: 0.35, type: "fiat"},
        LTC: {fractional_digits: 8, stake_default: 0.01, type: "crypto"},
        USD: {fractional_digits: 2, stake_default: 0.35, type: "fiat"}
    };


    it('Gets all loginids in accounts list', () => {
        const accounts = [{'account':'CR526255', 'currency':'AUD'},
            {'account':'CR549703', 'currency':'BTC'},
            {'account':'VRTC1614224', 'currency':'USD'}];

        const allLoginids = getAllLoginids(accounts);
        const expectedAllLoginids = ['CR526255', 'CR549703', 'VRTC1614224'];
        expect(allLoginids).toEqual(expectedAllLoginids);
    });

    it('Gets the type of account and type of CRxxxx account is equal to real', () => {
        const loginid = 'CR512345';
        const accountType = getAccountType(loginid);
        const expectedAccountType = 'real';
        expect(accountType).toEqual(expectedAccountType);
    });

    it('Gets the type of account and type of MFxxxxx account is equal to financial', () => {
        const loginid = 'MF12345';
        const accountType = getAccountType(loginid);
        const expectedAccountType = 'financial';
        expect(accountType).toEqual(expectedAccountType);
    });

    it('Gets the type of account and type of MLTxxxxx account is equal to financial', () => {
        const loginid = 'MLT12345';
        const accountType = getAccountType(loginid);
        const expectedAccountType = 'gaming';
        expect(accountType).toEqual(expectedAccountType);
    });

    it('Gets the type of account and type of VRTCxxxxx account is equal to financial', () => {
        const loginid = 'VRTC12345';
        const accountType = getAccountType(loginid);
        const expectedAccountType = 'virtual';
        expect(accountType).toEqual(expectedAccountType);
    });

    it('Says if account is of type passed as type in arguments (VRTCxxxxx is type virtual)', () => {
        const loginid = 'VRTC12345';
        const type = 'virtual';
        const isAccountOfThisType = isAccountOfType(type, loginid);
        const expectedIsAccountOfThisType = true;
        expect(isAccountOfThisType).toEqual(expectedIsAccountOfThisType);
    });

    it('Says if account is of type passed as type in arguments (VRTCxxxx is not type real)', () => {
        const loginid = 'VRTC12345';
        const type = 'real';
        const isAccountOfThisType = isAccountOfType(type, loginid);
        const expectedIsAccountOfThisType = false;
        expect(isAccountOfThisType).toEqual(expectedIsAccountOfThisType);
    });

    it('Says if account is of type passed as type in arguments (MFxxxx is type real)', () => {
        const loginid = 'MF12345';
        const type = 'real';
        const isAccountOfThisType = isAccountOfType(type, loginid);
        const expectedIsAccountOfThisType = true;
        expect(isAccountOfThisType).toEqual(expectedIsAccountOfThisType);
    });

    it('Says if user has account of type real', () => {
        const accounts = [{'account':'CR526255', 'currency':'AUD'},
            {'account':'CR549703', 'currency':'BTC'},
            {'account':'VRTC1614224', 'currency':'USD'}];

        const type = 'real';
        const hasAccountOfTypeReal = hasAccountOfType(type, accounts);
        const expectedHasAccountOfTypeReal = true;
        expect(hasAccountOfTypeReal).toEqual(expectedHasAccountOfTypeReal);
    });

    it('Says if user has account of type financial', () => {
        const accounts = [{'account':'CR526255', 'currency':'AUD'},
            {'account':'CR549703', 'currency':'BTC'},
            {'account':'VRTC1614224', 'currency':'USD'}];

        const type = 'financial';
        const hasAccountOfTypeFinancial = hasAccountOfType(type, accounts);
        const expectedHasAccountOfTypeFinancial = false;
        expect(hasAccountOfTypeFinancial).toEqual(expectedHasAccountOfTypeFinancial);
    });

    it('Says if user has account of type real', () => {
        const accounts = [{'account':'VRTC1614224', 'currency':'USD'}];

        const type = 'real';
        const hasAccountOfTypeReal = hasAccountOfType(type, accounts);
        const expectedHasAccountOfTypeReal = false;
        expect(hasAccountOfTypeReal).toEqual(expectedHasAccountOfTypeReal);
    });

    it('Says if user has account of type real', () => {
        const accounts = [{'account':'VRTC1614224', 'currency':'USD'},
            {'account':'MF12345', 'currency':'USD'}];

        const type = 'financial';
        const hasAccountOfTypeFinancial = hasAccountOfType(type, accounts);
        const expectedHasAccountOfTypeFinancial = true;
        expect(hasAccountOfTypeFinancial).toEqual(expectedHasAccountOfTypeFinancial);
    });

    it('Gets the landingCompany value we expect from landingCompany object', () => {
        const loginid = 'MF12345';
        const key = 'legal_allowed_currencies';
        const value = landingCompanyValue(loginid, key, landingCompany);
        const expectedValue = ["AUD","BCH","BTC","ETH","EUR","GBP","LTC","USD"];
        expect(value).toEqual(expectedValue);
    });

    it('Gets the landingCompany value we expect from landingCompany object', () => {
        const loginid = 'MLT12345';
        const key = 'legal_allowed_currencies';
        const value = landingCompanyValue(loginid, key, landingCompany);
        const expectedValue = ["AUD","BCH","BTC","ETH","EUR","GBP","LTC","USD"];
        expect(value).toEqual(expectedValue);
    });

    it('Gets the landingCompany value we expect from landingCompany object', () => {
        const loginid = 'CR12345';
        const key = 'legal_allowed_currencies';
        const value = landingCompanyValue(loginid, key, landingCompany);
        const expectedValue = ["AUD","BCH","BTC","ETH","EUR","GBP","LTC","USD"];
        expect(value).toEqual(expectedValue);
    });

    it('Gets the landingCompany value we expect from landingCompany object', () => {
        const loginid = 'MF12345';
        const key = 'legal_allowed_markets';
        const value = landingCompanyValue(loginid, key, landingCompany);
        const expectedValue = ["commodities","forex","indices","stocks","volidx"];
        expect(value).toEqual(expectedValue);
    });

    it('Gets the landingCompany value we expect from landingCompany object', () => {
        const loginid = 'MLT12345';
        const key = 'legal_allowed_markets';
        const value = landingCompanyValue(loginid, key, landingCompany);
        const expectedValue = ["commodities","forex","indices","stocks","volidx"];
        expect(value).toEqual(expectedValue);
    });

    it('Gets the landingCompany value we expect from landingCompany object', () => {
        const loginid = 'CR12345';
        const key = 'legal_allowed_markets';
        const value = landingCompanyValue(loginid, key, landingCompany);
        const expectedValue = ["commodities","forex","indices","stocks","volidx"];
        expect(value).toEqual(expectedValue);
    });

    it('Gets the landingCompany value we expect from landingCompany object (if virtual concat both gaming and financial landing companies values)', () => {
        const loginid = 'VRTC12345';
        const key = 'legal_allowed_markets';
        const value = landingCompanyValue(loginid, key, landingCompany);
        const expectedValue = ["commodities","forex","indices","stocks","volidx","commodities","forex","indices","stocks","volidx"];
        expect(value).toEqual(expectedValue);
    });

    it('Gets the currencies existing in accounts expect currency for virtual account', () => {
        const accounts =  [{'account':'CR526255', 'currency':'AUD'},
            {'account':'CR549703', 'currency':'BTC'},
            {'account':'VRTC1614224', 'currency':'USD'}];
        const exisitngCurrencies = getExistingCurrencies(accounts);
        const expectedExisitngCurrencies = ["AUD", "BTC"];
        expect(exisitngCurrencies).toEqual(expectedExisitngCurrencies);
    });

    it('Groups currencies in 2 groups based on being crypto or not)', () => {
        const currencies = ['USD', 'BTC', 'AUD', 'ETH'];
        const groupedCurrencies = groupCurrencies(currencies, currencyConfig);
        const expectedGroupedCurrencies = {
            "cryptoCurrencies":["BTC","ETH"],
            "fiatCurrencies":["USD","AUD"]
        };
        expect(groupedCurrencies).toEqual(expectedGroupedCurrencies);
    });

    it('Filter markets based on available markets and return an string of their names joined with ", ")', () => {
        const markets = ["commodities","forex","indices","stocks","volidx","smarties"];
        const filteredMarkets = filterMarkets(markets, activeMarkets);
        const expectedFilteredMarkets = "Commodities, Forex, Indices, Stocks, Volatility Indices";
        expect(filteredMarkets).toEqual(expectedFilteredMarkets);
    });

    it('Get existing accounts with their loginid, allowed markets, type and currency', () => {
        const accounts = [{'account':'CR549703', 'currency':'BTC'},
            {'account':'VRTC1614224', 'currency':'USD'}];
        const existingAccounts = getExistingAccounts(accounts, landingCompany, activeMarkets);
        const expectedExistingAccounts = [
            {
                id: 'CR549703',
                availableMarkets: "Commodities, Forex, Indices, Stocks, Volatility Indices",
                type: 'real',
                currency: 'BTC'
            },
            {
                id: 'VRTC1614224',
                availableMarkets: "Commodities, Forex, Indices, Stocks, Volatility Indices",
                type: 'virtual',
                currency: 'USD'
            }
        ];
        expect(existingAccounts).toEqual(expectedExistingAccounts);
    });

    it('Get options to choose currency from for this account', () => {
        const accounts = [
            {"account":"CR526255", "currency":"AUD"},
            {"account":"CR549703"},
            {"account":"VRTC1614224", "currency":"USD"}
        ];
        const options = populateCurrencyOptions('CR549703', accounts, landingCompany, currencyConfig);
        const expectedOptions = [
            {
                "fractional_digits": 8,
                "group": "Cryptocurrency",
                "img": "/img/bch.svg",
                "name": "bitcoin_cash",
                "stake_default": 0.001,
                "text": "BCH",
                "type": "crypto",
                "value": "BCH"
            },
            {
                "fractional_digits": 8,
                "group": "Cryptocurrency",
                "img": "/img/btc.svg",
                "name": "bitcoin",
                "stake_default": 0.0002,
                "text": "BTC",
                "type": "crypto",
                "value": "BTC"
            },
            {
                "fractional_digits": 8,
                "group": "Cryptocurrency",
                "img": "/img/eth.svg",
                "name": "ether",
                "stake_default": 0.002,
                "text": "ETH",
                "type": "crypto",
                "value": "ETH"
            }, {
                "fractional_digits": 8,
                "group": "Cryptocurrency",
                "img": "/img/ltc.svg",
                "name": "litecoin",
                "stake_default": 0.01,
                "text": "LTC",
                "type": "crypto",
                "value": "LTC"
            }
        ];

        expect(options).toEqual(expectedOptions);
    });

});