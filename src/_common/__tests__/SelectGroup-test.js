import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import { renderShallow } from '../../_utils/TestUtils';
import SelectGroup from '../SelectGroup';

expect.extend(expectJSX);

describe('RadioItem', () => {
    it('renders with no properties', () => {
        const output = renderShallow(<SelectGroup />);
        expect(output.type).toEqual('fieldset');
    });
    it('passes className to fieldset', () => {
        const output = renderShallow(<SelectGroup className="test-class" />);
        expect(output.props.className).toEqual("test-class");
    });
    it('passes id to select', () => {
        const output = renderShallow(<SelectGroup id="test-id" />);
        const expected = (
            <select id="test-id" onChange={undefined} placeholder={undefined} readOnly={undefined} value={undefined} />
        );
        expect(output).toIncludeJSX(expected);
    });
});
