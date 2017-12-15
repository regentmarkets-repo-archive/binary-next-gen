import React from 'react';
import { shallow } from 'enzyme';
import UserAccountsCard from '../UserAccountsCard';

describe('<UserAccountsCard />', () => {
    it('should render', () => {
        const loginid = 'CR12345';
        const account = {};
        const accounts = [{"account":"VRTC12345","currency":"USD"},{"account":"CR12345","currency":""}];
        const upgradeInfo = {};
        const wrapper = shallow(<UserAccountsCard loginid={loginid} account={account} accounts={accounts} upgradeInfo={upgradeInfo} />);

        expect(wrapper.type()).toBeDefined();
    });
});
