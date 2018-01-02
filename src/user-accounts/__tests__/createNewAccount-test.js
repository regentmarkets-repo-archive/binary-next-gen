import React from 'react';
import { shallow } from 'enzyme';
import CreateNewAccount from '../CreateNewAccount';

describe('<CreateNewAccount />', () => {
    it('should render with empty props', () => {
        const loginid = '';
        const account = {};
        const markets = [];
        const nextAccountTitle = '';
        const upgradeInfo = {};
        const wrapper = shallow(<CreateNewAccount
            loginid={loginid}
            account={account}
            markets={markets}
            nextAccountTitle={nextAccountTitle}
            upgradeInfo={upgradeInfo} />);

        expect(wrapper.type()).toBeDefined();
    });

    it('should render create account table when upgradeInfo has canUpgrade equal to true', () => {
        const loginid = '';
        const account = {};
        const markets = [];
        const nextAccountTitle = '';
        const upgradeInfo = {
            canUpgrade: true
        };
        const wrapper = shallow(<CreateNewAccount
            loginid={loginid}
            account={account}
            markets={markets}
            nextAccountTitle={nextAccountTitle}
            upgradeInfo={upgradeInfo} />);

        const createNewAccountTable = wrapper.find('table').hostNodes();

        expect(createNewAccountTable.length).toEqual(1);
    });

    it('should not render create account table when upgradeInfo has canUpgrade equal to false', () => {
        const loginid = '';
        const account = {};
        const markets = [];
        const nextAccountTitle = '';
        const upgradeInfo = {
            canUpgrade: false
        };
        const wrapper = shallow(<CreateNewAccount
            loginid={loginid}
            account={account}
            markets={markets}
            nextAccountTitle={nextAccountTitle}
            upgradeInfo={upgradeInfo} />);

        const createNewAccountTable = wrapper.find('table').hostNodes();

        expect(createNewAccountTable.length).toEqual(0);
    });

    it('should set currency_error in state equal to true if user has no currency set for current account', () => {
        const loginid = 'CR12345';
        const account = {loginid: 'CR12345', currency: ''};
        const markets = [];
        const settings = {};
        const nextAccountTitle = '';
        const upgradeInfo = {
            canUpgrade: true
        };
        const wrapper = shallow(<CreateNewAccount
            loginid={loginid}
            account={account}
            markets={markets}
            nextAccountTitle={nextAccountTitle}
            upgradeInfo={upgradeInfo}
            settings={settings} />);
        wrapper.setProps({settings: { first_name: 'abcde' }, currencyOptions: ['EUR'], account: {loginid: 'CR12345', currency: ''} });
        wrapper.find('#submit').last().simulate('click');

        const currencyError = wrapper.state('currency_error');

        expect(currencyError).toEqual(true);
    });

  it('should render note for CR accounts which are able to open a new account', () => {
    const loginid = 'CR12345';
    const account = {loginid: 'CR12345', currency: '', landing_company_name: 'costarica'};
    const markets = [];
    const nextAccountTitle = '';
    const upgradeInfo = {
      canUpgrade: true,
      multi: true,
    };
    const wrapper = shallow(<CreateNewAccount
      loginid={loginid}
      account={account}
      markets={markets}
      nextAccountTitle={nextAccountTitle}
      upgradeInfo={upgradeInfo} />);

      wrapper.setProps({settings: { first_name: 'abcde' }, currencyOptions: ['EUR']});

    wrapper.find('#submit').last().simulate('click');

    expect(wrapper.find('P').exists());
  });

});
