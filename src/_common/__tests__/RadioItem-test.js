import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import { renderShallow } from '../../_utils/TestUtils';
import RadioItem from '../RadioItem';

expect.extend(expectJSX);

describe('RadioItem', () => {
    it('renders with no properties', () => {
        const output = renderShallow(<RadioItem />);
        expect(output.type).toEqual('span');
    });
    it('renders a label even if no properties', () => {
        const output = renderShallow(<RadioItem />);
        const expected = (
            <label htmlFor={undefined} />
        );
        expect(output).toIncludeJSX(expected);
    });
});
