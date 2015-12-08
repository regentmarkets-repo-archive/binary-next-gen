import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { Panel } from '../_common';
import * as VideoActions from '../_actions/VideoActions';
import VideoData from '../_data/VideoData';
import VideoList from './VideoList';

@connect(state => ({ video: state.video }))
export default class VideoPage extends React.Component {

    static propTypes = {
		video: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
	};

    elementOnClick(title, videoUrl) {
        return () => this.props.dispatch(VideoActions.changeActiveVideo(title, videoUrl));
    }

    componentDidMount() {
        VideoData.getAllVideo().then((vl) => {
            this.props.dispatch(VideoActions.updateVideoList(vl));
        });
    }

    render() {
        const { video } = this.props;
        const url = video.get('activeUrl');
        const title = video.get('activeTitle');
        const videos = video.get('videos');

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
