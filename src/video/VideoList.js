import React, { Component, PropTypes } from 'react';
import VideoThumbnail from './VideoThumbnail';

export default class VideoList extends Component {

    static propTypes = {
        videos: PropTypes.array,
        onSelect: PropTypes.func,
    };

    render() {
        const { videos, onSelect } = this.props;

        return (
            <ul className="video-list row">
                {videos.map(video =>
                    <VideoThumbnail
                        key={video.videoId}
                        title={video.title}
                        imgSrc={video.imgSrc}
                        videoId={video.videoId}
                        onClick={onSelect}
                    />
                )}
            </ul>
        );
    }
}
