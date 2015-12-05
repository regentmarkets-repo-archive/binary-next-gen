import React from 'react';

export default class VideoThumbnail extends React.Component {

    static propTypes = {
		imgSrc: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired,
		videoId: React.PropTypes.string.isRequired,
		onSelect: React.PropTypes.func,
	};

    render() {
        const { imgSrc, title, videoId } = this.props;

        return (
            <a target="_new" href={'https://www.youtube.com/watch?v=' + videoId}>
                <img src={imgSrc}/>
                <p>{title}</p>
            </a>
        );
    }
}
