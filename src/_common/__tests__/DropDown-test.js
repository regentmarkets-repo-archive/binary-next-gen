import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import { renderShallow, Simulate } from '../../_utils/TestUtils';
import DropDown from '../DropDown';

expect.extend(expectJSX);

describe('DropDown', () => {
    it('renders a drop down', () => {
        const output = renderShallow(<DropDown />);
        expect(output.type).toEqual('div');
    });

    // it('renders nothing if shown is false', () => {
    //     const output = renderShallow(<DropDown shown={false} />);
    //     expect(output).toEqual(null);
    // });

    // it('is closed when overlay is clicked', () => {
    //     const output = renderShallow(<DropDown />);
    //     const node = output.refs.dropDown;
    //     Simulate.click(node);
    //     expect(output).toEqualJSX(null);
    // });
});
