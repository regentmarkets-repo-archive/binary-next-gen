import { Panel } from '../_common';
import React from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import VideoList from './VideoList'

@connect(state => ({video: state.video}))
export default class VideoPanel extends React.Component {

    render() {
        const url = this.props.video.get('url');
        const title = this.props.video.get('title');
        const videos = this.props.video.get('videos');

        console.log(videos);
        return (
            <div>
                <Panel title={title}>
                    <YouTube url={url}/>
                </Panel>
                <Panel title={"Video List"}>
                    <VideoList videos={videos} />
                </Panel>
            </div>
        );
    }
}

