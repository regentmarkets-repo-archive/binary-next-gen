import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import ExamineAssetCard from './ExamineAssetCard';
import examineAssetSelectors from './examineAssetSelectors';

@connect(examineAssetSelectors)
export default class ExamineAssetContainer extends PureComponent {
    render() {
        return <ExamineAssetCard {...immutableChildrenToJS(this.props)} />;
    }
}
