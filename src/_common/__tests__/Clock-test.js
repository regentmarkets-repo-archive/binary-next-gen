import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Clock from '../Clock';
import { IntlProvider } from 'react-intl';


describe('Clock', () => {
	it('should be able to render clock properly', () => {
		const wrapper = shallow(<Clock time={ (new Date()).getTime() } />);
		expect(wrapper.render().text()).to.contain('GMT');
	});

	it("should display the current time's hour", () => {
		const wrapper = shallow(<Clock time={ (new Date()).getTime()} />);
		const time = new Date(wrapper.unrendered.props.time);
		expect(time.getHours()).to.equal((new Date()).getHours());
	});

});
