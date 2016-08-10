import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import AssetInfoCard from './AssetInfoCard';
import AssetInfoSelector from './AssetInfoSelector';

@connect(AssetInfoSelector)
export default class AssetInfoContainer extends PureComponent {
    render() {
        return <AssetInfoCard {...immutableChildrenToJS(this.props)} />
    }
}
