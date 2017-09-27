import React from 'react';
import UpgradeToRealCard from '../UpgradeToRealCard';
import { mountWithIntl } from 'enzyme-react-intl';

describe('<UpgradeToRealCard />', () => {
  it('Component should be rendered', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard />);

    expect(wrapper.type()).toBeDefined();
  });

  it('First Name should exist', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard />);
    const firstName = wrapper.find('#first_name');

    expect(firstName.length).toEqual(1);
  });

  it('First Name should exist', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard />);
    const firstName = wrapper.find('#first_name');

    expect(firstName.length).toEqual(1);
  });

  it('First name should be valid when input is valid', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard />);
    const firstName = wrapper.find('#first_name');
    firstName.node.value = 'abcdefg';
    firstName.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.first_name).toBeUndefined();
  });

  it('First name should have error when input is not valid', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard />);
    const firstName = wrapper.find('#first_name');
    firstName.node.value = 'abcd#$';
    firstName.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.first_name[0]).toEqual('Only letters, space, hyphen, period, and apostrophe are allowed.');
  });

  it('First name should have required error when props is not empty and input is empty', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard />);
    const firstName = wrapper.find('#first_name');
    wrapper.setProps({ first_name: 'abcde' });
    firstName.node.value = null;
    firstName.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.first_name[0]).toEqual('This field is required.');
  });

  it('Secret Question should be visible when loginid has VRTC', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard />);
    wrapper.setProps({ loginid: 'VRTC12345' });
    const secretQuestion = wrapper.find('#secret_question');

    expect(secretQuestion.length).toEqual(1);
  });

  it('Secret Question should be hidden when loginid has not VRTC', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard />);
    wrapper.setProps({ loginid: 'MLT12345' });
    const secretQuestion = wrapper.find('#secret_question');

    expect(secretQuestion.length).toEqual(0);
  });


});