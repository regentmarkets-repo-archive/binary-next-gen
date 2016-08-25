import React, { PropTypes, PureComponent } from 'react';

export default class VideoThumbnail extends PureComponent {

    static propTypes = {
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		videoId: PropTypes.string.isRequired,
		onSelect: PropTypes.func,
	};
    openVideo = () => {
        const { videoId } = this.props;
        window.open('https://www.youtube.com/watch?v=' + videoId, '_blank');
    }
    render() {
        const { imgSrc, title } = this.props;

        return (
            <a className="video-thumbnail" onClick={this.openVideo}>
                <div className="video-img" style={{ backgroundImage: `url(${imgSrc})` }} />
                <h5>{title}</h5>
            </a>
        );
    }
}
