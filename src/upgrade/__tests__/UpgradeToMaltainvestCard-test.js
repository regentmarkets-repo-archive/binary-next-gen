import React from 'react';
import moment from 'moment';
import UpgradeToMaltainvestCard from '../UpgradeToMaltainvestCard';
import { mountWithIntl } from 'enzyme-react-intl';

describe('<UpgradeToMaltainvestCard />', () => {
  it('Component should be rendered', () => {
    const wrapper = mountWithIntl(<UpgradeToMaltainvestCard />);

    expect(wrapper.type()).toBeDefined();
  });
/*
  it('Max balance should exist', () => {
    const wrapper = mountWithIntl(<UpgradeToMaltainvestCard />);
    const maxBalance = wrapper.find('#max_balance');

    expect(maxBalance.length).toEqual(1);
  });

  it('Max balance should be valid when input is valid number', () => {
    const wrapper = mountWithIntl(<UpgradeToMaltainvestCard />);
    const maxBalance = wrapper.find('#max_balance');
    maxBalance.node.value = 123;
    maxBalance.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.max_balance).toBeUndefined();
  });

  it('Max balance should have error when input is string', () => {
    const wrapper = mountWithIntl(<UpgradeToMaltainvestCard />);
    const maxBalance = wrapper.find('#max_balance');
    maxBalance.node.value = 'abcd';
    maxBalance.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.max_balance[0]).toEqual('Should be a valid number');
  });

  it('Max balance should have required error when props is not empty and input is empty', () => {
    const wrapper = mountWithIntl(<UpgradeToMaltainvestCard />);
    const maxBalance = wrapper.find('#max_balance');
    wrapper.setProps({ max_balance: 15000 });
    maxBalance.node.value = null;
    maxBalance.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.max_balance[0]).toEqual('This field is required.');
  });

  it('Max balance should not have required error when props is empty and input is empty', () => {
    const wrapper = mountWithIntl(<UpgradeToMaltainvestCard />);
    const maxBalance = wrapper.find('#max_balance');
    maxBalance.node.value = null;
    maxBalance.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.max_balance).toBeUndefined();
  });

  it('Max balance should have equal/less than error when input is greater than props.max_balance', () => {
    const wrapper = mountWithIntl(<UpgradeToMaltainvestCard />);
    const maxBalance = wrapper.find('#max_balance');
    wrapper.setProps({ max_balance: 15000 });
    maxBalance.node.value = 16000;
    maxBalance.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.max_balance[0]).toEqual('Should be between 0 and 15000');
  });*/

});
