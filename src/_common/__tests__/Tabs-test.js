import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import { renderShallow } from '../../_utils/TestUtils';
import Tabs from '../Tabs';

expect.extend(expectJSX);

describe('Tabs', () => {
    it('renders correctly with no properties', () => {
        const output = renderShallow(<Tabs id="test" tabs={[]} />);
        const expected = (
            <div role="tabs" />
        );
        expect(output).toIncludeJSX(expected);
    });
});
