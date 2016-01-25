import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import { FormattedMessage } from 'react-intl';
import { renderShallow } from '../../_utils/TestUtils';
import M from '../M';

expect.extend(expectJSX);

describe('M', () => {
    it('renders even whithout properties', () => {
        const output = renderShallow(<M />);
        expect(output.type).toNotEqual(null);
    });

    it('renders FormattedMessage', () => {
        const output = renderShallow(<M />);
        const expected = (<FormattedMessage defaultMessage="" id="" />);
        expect(output).toIncludeJSX(expected);
    });
});
