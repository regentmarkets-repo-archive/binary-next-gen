import React, { PureComponent } from 'react';
import VideoThumbnail from './VideoThumbnail';

type Video = {
    videoId: number,
    title: string,
    imgSrc: string,
};

export default class VideoList extends PureComponent {
    props: {
        videos: Video[],
        onSelect: (e: SyntheticEvent) => void,
    };

    render() {
        const { videos, onSelect } = this.props;

        return (
            <div className="video-list scrollable">
                {videos.map(video => (
                    <VideoThumbnail
                        key={video.videoId}
                        title={video.title}
                        imgSrc={video.imgSrc}
                        videoId={video.videoId}
                        onClick={onSelect}
                    />
                ))}
            </div>
        );
    }
}
