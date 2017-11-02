import React from 'react';
import UpgradeToRealCard from '../UpgradeToRealCard';
import { mountWithIntl } from 'enzyme-react-intl';

describe('<UpgradeToRealCard />', () => {
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
    boot: {
      language: 'PL',
    },
    states: [
      {
        "text": "Sachsen",
        "value": "SN"
      },
      {
        "text": "Sachsen-Anhalt",
        "value": "ST"
      },
      {
        "text": "Schleswig-Holstein",
        "value": "SH"
      },
      {
        "text": "Thüringen",
        "value": "TH"
      }
    ],
    loginid: 'VRTC1234',
  };

  it('Component should be rendered', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard {...PROPS} />);

    expect(wrapper.type()).toBeDefined();
  });

  it('First Name should exist', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard {...PROPS} />);
    const firstName = wrapper.find('#first_name').hostNodes();

    expect(firstName.length).toEqual(1);
  });

  it('First Name should exist', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard {...PROPS} />);
    const firstName = wrapper.find('#first_name').hostNodes();

    expect(firstName.length).toEqual(1);
  });

  it('First name should be valid when input is valid', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard {...PROPS} />);
    const firstName = wrapper.find('#first_name').hostNodes();
    firstName.instance().value = 'abcdefg';
    wrapper.update();
    firstName.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.first_name).toBeUndefined();
  });

  it('First name should have error when input is not valid', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard {...PROPS} />);
    const firstName = wrapper.find('#first_name').hostNodes();
    firstName.instance().value = 'abcd#$';
    wrapper.update();
    firstName.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.first_name[0]).toEqual('Only letters, space, hyphen, period, and apostrophe are allowed.');
  });
});