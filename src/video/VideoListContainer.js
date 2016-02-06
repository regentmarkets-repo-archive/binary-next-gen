import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import VideoList from './VideoList';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import videoSelectors from '../_selectors/VideoSelectors';

@connect(videoSelectors)
export default class VideoListContainer extends React.Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <VideoList {...immutableChildrenToJS(this.props)} />
        );
    }
}
