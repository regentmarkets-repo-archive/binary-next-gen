import React from 'react';
import SettingsUserInformation from '../SettingsUserInformation';
import { mountWithIntl } from 'enzyme-react-intl';

describe('<SettingsUserInformation />', () => {
  const PROPS = {
    residenceList:  [{
      "phone_idd": "260",
      "text": "Zambia",
      "value": "zm"
    },
      {
        "phone_idd": "263",
        "text": "Zimbabwe",
        "value": "zw"
      }
    ],
    loginid: 'MLT80647',
  };
  // test max_balance as an input which should be number and being validated (other inputs behave like this too)
  it('Component should be rendered', () => {
    const wrapper = mountWithIntl(<SettingsUserInformation {...PROPS} />);

    expect(wrapper.type()).toBeDefined();
  });

  it('address line 1 should have required error when input is empty', () => {
    const wrapper = mountWithIntl(<SettingsUserInformation {...PROPS} />);
    const addressLine1 = wrapper.find('#address_line_1');
    addressLine1.node.value = null;
    addressLine1.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.address_line_1[0]).toEqual('This field is required.');
  });

  it('address line 1 should be valid when format is valid', () => {
    const wrapper = mountWithIntl(<SettingsUserInformation {...PROPS} />);
    const addressLine1 = wrapper.find('#address_line_1');
    addressLine1.node.value = 'test 123 test';
    addressLine1.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.address_line_1).toBeUndefined();
  });

  it('address line 1 should not be valid when format is not valid', () => {
    const wrapper = mountWithIntl(<SettingsUserInformation {...PROPS} />);
    const addressLine1 = wrapper.find('#address_line_1');
    addressLine1.node.value = 'test " test';
    addressLine1.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.address_line_1[0]).toEqual('Only letters, numbers, space, and these special characters are allowed: - . \' # ; : ( ) , @ /');
  });

  it('address line 2 should not have required error when input is empty', () => {
    const wrapper = mountWithIntl(<SettingsUserInformation {...PROPS} />);
    const addressLine2 = wrapper.find('#address_line_2');
    addressLine2.node.value = null;
    addressLine2.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.address_line_2s).toBeUndefined();
  });

  it('address city should be valid when format is valid', () => {
    const wrapper = mountWithIntl(<SettingsUserInformation {...PROPS} />);
    const addressCity = wrapper.find('#address_city');
    addressCity.node.value = 'test test';
    addressCity.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.address_city).toBeUndefined();
  });

  it('address city should not be valid when format is not valid', () => {
    const wrapper = mountWithIntl(<SettingsUserInformation {...PROPS} />);
    const addressCity = wrapper.find('#address_city');
    addressCity.node.value = 'test " test';
    addressCity.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.address_city[0]).toEqual('Only letters, space, hyphen, period, and apostrophe are allowed.');
  });

  it('address city should be valid when format is valid', () => {
    const wrapper = mountWithIntl(<SettingsUserInformation {...PROPS} />);
    const addressPostCode = wrapper.find('#address_postcode');
    addressPostCode.node.value = 'test 123 test';
    addressPostCode.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.address_postcode).toBeUndefined();
  });

  it('address city should not be valid when format is not valid', () => {
    const wrapper = mountWithIntl(<SettingsUserInformation {...PROPS} />);
    const addressPostCode = wrapper.find('#address_postcode');
    addressPostCode.node.value = 'test " test';
    addressPostCode.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.address_postcode[0]).toEqual('Only letters, numbers, space, and hyphen are allowed.');
  });

  it('phone should be valid when format is valid', () => {
    const wrapper = mountWithIntl(<SettingsUserInformation {...PROPS} />);
    const phone = wrapper.find('#phone');
    phone.node.value = '123 456 789';
    phone.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.phone).toBeUndefined();
  });

  it('phone should not be valid when format is not valid', () => {
    const wrapper = mountWithIntl(<SettingsUserInformation {...PROPS} />);
    const phone = wrapper.find('#phone');
    phone.node.value = 'test 123';
    phone.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.phone[0]).toEqual('Only numbers and spaces are allowed.');
  });

});
