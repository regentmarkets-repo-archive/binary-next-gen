import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import VideoList from './VideoList';
import videoSelectors from './VideoSelectors';

@connect(videoSelectors)
export default class VideoListContainer extends PureComponent {
    render() {
        return <VideoList {...immutableChildrenToJS(this.props)} />;
    }
}
