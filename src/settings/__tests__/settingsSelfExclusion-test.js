import React from 'react';
import moment from 'moment';
import SettingsSelfExclusion from '../SettingsSelfExclusion';
import { mountWithIntl } from 'enzyme-react-intl';

describe('<SettingsSelfExclusion />', () => {
  // test max_balance as an input which should be number and being validated (other inputs behave like this too)
  it('Component should be rendered', () => {
    const wrapper = mountWithIntl(<SettingsSelfExclusion />);

    expect(wrapper.type()).toBeDefined();
  });

  it('Max balance should exist', () => {
    const wrapper = mountWithIntl(<SettingsSelfExclusion />);
    const maxBalance = wrapper.find('#max_balance').hostNodes();

    expect(maxBalance.length).toEqual(1);
  });

  it('Max balance should be valid when input is valid number', () => {
    const wrapper = mountWithIntl(<SettingsSelfExclusion />);
    const maxBalance = wrapper.find('#max_balance').hostNodes();
    maxBalance.instance().value = 123;
    wrapper.update();
    maxBalance.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.max_balance).toBeUndefined();
  });

  it('Max balance should have error when input is string', () => {
    const wrapper = mountWithIntl(<SettingsSelfExclusion />);
    const maxBalance = wrapper.find('#max_balance').hostNodes();
    maxBalance.instance().value = 'abcd';
    wrapper.update();
    maxBalance.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.max_balance[0]).toEqual('Should be a valid number');
  });

  it('Max balance should have required error when props is not empty and input is empty', () => {
    const wrapper = mountWithIntl(<SettingsSelfExclusion />);
    const maxBalance = wrapper.find('#max_balance').hostNodes();
    wrapper.setProps({ max_balance: 15000 });
    maxBalance.instance().value = null;
    wrapper.update();
    maxBalance.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.max_balance[0]).toEqual('This field is required.');
  });

  it('Max balance should not have required error when props is empty and input is empty', () => {
    const wrapper = mountWithIntl(<SettingsSelfExclusion />);
    const maxBalance = wrapper.find('#max_balance').hostNodes();
    maxBalance.instance().value = null;
    wrapper.update();
    maxBalance.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.max_balance).toBeUndefined();
  });

  it('Max balance should have equal/less than error when input is greater than props.max_balance', () => {
    const wrapper = mountWithIntl(<SettingsSelfExclusion />);
    const maxBalance = wrapper.find('#max_balance').hostNodes();
    wrapper.setProps({ max_balance: 15000 });
    maxBalance.instance().value = 16000;
    wrapper.update();
    maxBalance.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.max_balance[0]).toEqual('Should be between 0 and 15000');
  });

  it('Timeout until date should be after moment', () => {
    const wrapper = mountWithIntl(<SettingsSelfExclusion />);
    const timeoutUntilDate = wrapper.find('#timeout_until_date').hostNodes();
    timeoutUntilDate.instance().value = moment().subtract(1, 'days');
    wrapper.update();
    timeoutUntilDate.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.timeout_until_date[0]).toEqual('Time out must be after today and cannot be more than 6 weeks.');
  });

  it('Timeout until date should be before 6 weeks later', () => {
    const wrapper = mountWithIntl(<SettingsSelfExclusion />);
    const timeoutUntilDate = wrapper.find('#timeout_until_date').hostNodes();
    timeoutUntilDate.instance().value = moment().add(6, 'weeks').add(1, 'days');
    wrapper.update();
    timeoutUntilDate.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.timeout_until_date[0]).toEqual('Time out must be after today and cannot be more than 6 weeks.');
  });

  it('Timeout until date should be true if value is after today and before 6 weeks', () => {
    const wrapper = mountWithIntl(<SettingsSelfExclusion />);
    const timeoutUntilDate = wrapper.find('#timeout_until_date').hostNodes();
    timeoutUntilDate.instance().value = moment();
    wrapper.update();
    timeoutUntilDate.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.timeout_until_date).toBeUndefined();
  });

  it('Timeout until time should have error when date is today and time is passed', () => {
    const wrapper = mountWithIntl(<SettingsSelfExclusion />);
    const timeoutUntilDate = wrapper.find('#timeout_until_date').hostNodes();
    const timeoutUntilTime = wrapper.find('#timeout_until_time').hostNodes();
    timeoutUntilDate.instance().value = moment();
    timeoutUntilTime.instance().value = moment().subtract(1, 'hours');
    wrapper.update();
    timeoutUntilTime.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.timeout_until_time[0]).toEqual('Time out cannot be in the past.');
  });

  it('Timeout until time should be valid when date is today and time is not passed', () => {
    const wrapper = mountWithIntl(<SettingsSelfExclusion />);
    const timeoutUntilDate = wrapper.find('#timeout_until_date').hostNodes();
    const timeoutUntilTime = wrapper.find('#timeout_until_time').hostNodes();
    timeoutUntilDate.instance().value = moment();
    timeoutUntilTime.instance().value = moment().add(1, 'hours');
    wrapper.update();
    timeoutUntilTime.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.timeout_until_time).toBeUndefined();
  });

  it('Timeout until time should be required when timeout until date is filled', () => {
    const wrapper = mountWithIntl(<SettingsSelfExclusion />);
    const timeoutUntilDate = wrapper.find('#timeout_until_date').hostNodes();
    timeoutUntilDate.instance().value = moment().add(1, 'days');
    wrapper.update();
    timeoutUntilDate.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.timeout_until_time[0]).toEqual('This field is required.');
  });

  it('Exclude time cannot be less than 6 months and more than 5 years.', () => {
    const wrapper = mountWithIntl(<SettingsSelfExclusion />);
    const excludeUntil = wrapper.find('#exclude_until').hostNodes();
    excludeUntil.instance().value = moment().add(6, 'months').add(1, 'days');
    wrapper.update();
    excludeUntil.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.exclude_until).toBeUndefined();
  });

  it('Exclude time cannot be less than 6 months and should have error.', () => {
    const wrapper = mountWithIntl(<SettingsSelfExclusion />);
    const excludeUntil = wrapper.find('#exclude_until').hostNodes();
    excludeUntil.instance().value = moment().add(6, 'months').subtract(1, 'days');
    wrapper.update();
    excludeUntil.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.exclude_until[0]).toEqual('Exclude time cannot be less than 6 months and more than 5 years.');
  });

  it('Exclude time cannot be more than 5 years and should have error.', () => {
    const wrapper = mountWithIntl(<SettingsSelfExclusion />);
    const excludeUntil = wrapper.find('#exclude_until').hostNodes();
    excludeUntil.instance().value = moment().add(5, 'years').add(1, 'days');
    wrapper.update();
    excludeUntil.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.exclude_until[0]).toEqual('Exclude time cannot be less than 6 months and more than 5 years.');
  });

});
