import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import UpgradeToMaltainvestCard from '../UpgradeToMaltainvestCard';

describe('<UpgradeToMaltainvestCard />', () => {
  const PROPS = {
    residenceList: [{
      phone_idd: '260',
      text: 'Zambia',
      value: 'zm'
    },
      {
        phone_idd: '263',
        text: 'Zimbabwe',
        value: 'zw'
      }
    ],
    boot: {
      language: 'PL',
    },
    states: [
      {
        text: 'Sachsen',
        value: 'SN'
      },
      {
        text: 'Sachsen-Anhalt',
        value: 'ST'
      },
      {
        text: 'Schleswig-Holstein',
        value: 'SH'
      },
      {
        text: 'Thüringen',
        value: 'TH'
      }
    ],
    loginid: 'MLT80647',
  };

  it('Component should be rendered', () => {
    const wrapper = mountWithIntl(<UpgradeToMaltainvestCard {...PROPS} />);

    expect(wrapper.type()).toBeDefined();
  });

  it('First Name should exist', () => {
    const wrapper = mountWithIntl(<UpgradeToMaltainvestCard {...PROPS} />);
    const firstName = wrapper.find('#first_name').hostNodes();

    expect(firstName.length).toEqual(1);
  });

  it('First Name should exist', () => {
    const wrapper = mountWithIntl(<UpgradeToMaltainvestCard {...PROPS} />);
    const firstName = wrapper.find('#first_name').hostNodes();

    expect(firstName.length).toEqual(1);
  });

  it('First name should be valid when input is valid', () => {
    const wrapper = mountWithIntl(<UpgradeToMaltainvestCard {...PROPS} />);
    const firstName = wrapper.find('#first_name').hostNodes();
    firstName.instance().value = 'abcdefg';
    wrapper.update();
    firstName.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.first_name).toBeUndefined();
  });

  it('First name should have error when input is not valid', () => {
    const wrapper = mountWithIntl(<UpgradeToMaltainvestCard {...PROPS} />);
    const firstName = wrapper.find('#first_name').hostNodes();
    firstName.instance().value = 'abcd#$';
    wrapper.update();
    firstName.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.first_name[0]).toEqual('Only letters, space, hyphen, period, and apostrophe are allowed.');
  });

  it('First name should have required error when props is not empty and input is empty', () => {
    const wrapper = mountWithIntl(<UpgradeToMaltainvestCard {...PROPS} />);
    const firstName = wrapper.find('#first_name').hostNodes();
    wrapper.setProps({ first_name: 'abcde' });
    firstName.instance().value = null;
    wrapper.update();
    firstName.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.first_name[0]).toEqual('This field is required.');
  });

  it('Secret Question should be visible when loginid has VRTC', () => {
    const wrapper = mountWithIntl(<UpgradeToMaltainvestCard {...PROPS} />);
    wrapper.setProps({ loginid: 'VRTC12345' });
    const secretQuestion = wrapper.find('#secret_question').hostNodes();

    expect(secretQuestion.length).toEqual(1);
  });

  it('Secret Question should be hidden when loginid has not VRTC', () => {
    const wrapper = mountWithIntl(<UpgradeToMaltainvestCard {...PROPS} />);
    wrapper.setProps({ loginid: 'MLT12345' });
    const secretQuestion = wrapper.find('#secret_question').hostNodes();

    expect(secretQuestion.length).toEqual(0);
  });
});
