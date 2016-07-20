import React, { PropTypes, Component } from 'react';

export default class VideoThumbnail extends Component {

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
                <img src={imgSrc} role="presentation" />
                <h5>{title}</h5>
            </a>
        );
    }
}
