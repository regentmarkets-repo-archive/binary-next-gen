import React from 'react';
import expect from 'expect';
import {createRenderer} from 'react-addons-test-utils';
import { FormattedTime } from 'react-intl';
import Clock from '../Clock';

describe('Clock',()=>{
	it('works',()=>{
		let renderer = createRenderer();
		let date = new Date();
		date.setMilliseconds(0)
		renderer.render(<Clock time={ date}> </Clock>);
		let actualElement = renderer.getRenderOutput();
		let expectedElement = <FormattedTime value={date} hour="numeric" minute="numeric" second="numeric" />;
        actualElement.props.value.setMilliseconds(0);
		expect(actualElement).toEqual(expectedElement);
	});
});