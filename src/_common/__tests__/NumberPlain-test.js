import React from 'react';
import expect from 'expect';
import { renderShallow } from '../../_utils/TestUtils';
import NumberPlain from '../NumberPlain';

describe('Direction', () => {
    it('renders without any properties', () => {
        const output = renderShallow(<NumberPlain />);
        expect(output.type).toEqual('span');
    });

    it('passes className to span', () => {
        const output = renderShallow(<NumberPlain className="test-class" />);
        expect(output.props.className).toEqual("test-class");
    });

    it('not passing a value does not renders just span', () => {
        const output = renderShallow(<NumberPlain />);
        const expected = (
            <span className={undefined} />
        );
        expect(output).toIncludeJSX(expected);    });
});
