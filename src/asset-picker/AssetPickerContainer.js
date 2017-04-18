import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';

import AssetPickerCard from './AssetPickerCard';
import assetPickerSelectors from './AssetPickerSelectors';

@connect(assetPickerSelectors)
export default class AssetPickerContainer extends PureComponent {
    render() {
        return <AssetPickerCard {...immutableChildrenToJS(this.props)} />;
    }
}
