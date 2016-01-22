import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import { FormattedMessage } from 'react-intl';
import { renderShallow } from '../../_utils/TestUtils';
import Modal from '../Modal';

expect.extend(expectJSX);

describe('Modal', () => {
    it('renders a modal', () => {
        const output = renderShallow(<Modal />);
        expect(output.type).toEqual('div');
    });

    it('renders empty div if shown is false', () => {
        const output = renderShallow(<Modal shown={false} />);
        expect(output).toEqualJSX(<div />);
    });
});
