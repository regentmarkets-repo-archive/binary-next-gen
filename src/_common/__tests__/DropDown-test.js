import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import { renderShallow } from '../../_utils/TestUtils';
import DropDown from '../DropDown';

expect.extend(expectJSX);

describe('DropDown', () => {
    it('renders a drop down', () => {
        const output = renderShallow(<DropDown />);
        expect(output.type).toEqual('div');
    });
});
