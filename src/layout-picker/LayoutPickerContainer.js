import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import LayoutButtonList from './LayoutButtonList';
// import LayoutPicker from './LayoutPicker';
import layoutSelector from './layoutSelector';

@connect(layoutSelector)
export default class LayoutPickerContainer extends PureComponent {

    render() {
        return (
            <LayoutButtonList {...immutableChildrenToJS(this.props)} />
        );
    }
}
