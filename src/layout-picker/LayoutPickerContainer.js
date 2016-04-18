import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import LayoutPicker from './LayoutPicker';
import layoutSelector from './layoutSelector';

@connect(layoutSelector)
export default class LayoutPickerContainer extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <LayoutPicker {...immutableChildrenToJS(this.props)} />
        );
    }
}
