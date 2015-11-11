import { Panel } from '../_common';
import React from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import VideoList from './VideoList';
import VideoData from '../_data/VideoData';
import * as VideoAction from '../_actions/VideoActions';

@connect(state => ({video: state.video}))
export default class VideoPage extends React.Component {

    elementOnClick(title, videoUrl) {
        return () => this.props.dispatch(VideoAction.changeActiveVideo(title, videoUrl));
    }

    componentDidMount() {
        VideoData.getAllVideo().then((vl) => {
            this.props.dispatch(VideoAction.updateVideoList(vl));
        });
    }

    render() {
        const url = this.props.video.get('activeUrl');
        const title = this.props.video.get('activeTitle');
        const videos = this.props.video.get('videos');

        return (
            <div>
                <Panel title={title}>
                    <YouTube url={url}/>
                </Panel>
                <Panel title={"Video List"}>
                    <VideoList
                        videos={videos}
                        elementOnClick={::this.elementOnClick}/>
                </Panel>
            </div>
        );
    }
}

