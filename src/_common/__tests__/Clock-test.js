import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Clock from '../Clock';

describe('<Clock />', () => {
	it('should be able to render component with no paramenters', () => {
		const wrapper = shallow(<Clock />);
		expect(wrapper.render().text()).to.contain('GMT');
	});
});
