import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import LayoutPicker from './LayoutPicker';
import layoutSelector from './layoutSelector';

@connect(layoutSelector)
export default class LayoutPickerContainer extends PureComponent {

    render() {
        return (
            <LayoutPicker {...immutableChildrenToJS(this.props)} />
        );
    }
}
