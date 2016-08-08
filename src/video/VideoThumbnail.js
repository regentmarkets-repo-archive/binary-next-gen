import React, { PropTypes, PureComponent } from 'react';

export default class VideoThumbnail extends PureComponent {

    static propTypes = {
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		videoId: PropTypes.string.isRequired,
		onSelect: PropTypes.func,
	};

    render() {
        const { imgSrc, title, videoId } = this.props;

        return (
            <a className="video-thumbnail" target="_new" href={'https://www.youtube.com/watch?v=' + videoId}>
                <div className="video-img" style={{ backgroundImage: `url(${imgSrc})` }} />
                <h5>{title}</h5>
            </a>
        );
    }
}
