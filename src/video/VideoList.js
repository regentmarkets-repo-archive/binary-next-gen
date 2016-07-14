import React, { PureComponent, PropTypes } from 'react';
import VideoThumbnail from './VideoThumbnail';

export default class VideoList extends PureComponent {

    static propTypes = {
        videos: PropTypes.array,
        onSelect: PropTypes.func,
    };

    render() {
        const { videos, onSelect } = this.props;

        return (
            <div className="video-list">
                {videos.map(video =>
                    <VideoThumbnail
                        key={video.videoId}
                        title={video.title}
                        imgSrc={video.imgSrc}
                        videoId={video.videoId}
                        onClick={onSelect}
                    />
                )}
            </div>
        );
    }
}
