import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoList from './VideoList';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import videoSelectors from './VideoSelectors';

@connect(videoSelectors)
export default class VideoListContainer extends Component {

    render() {
        return (
            <VideoList {...immutableChildrenToJS(this.props)} />
        );
    }
}
