import React from 'react';

export default class VideoThumbnail extends React.Component {

    static propTypes = {
		imgSrc: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired,
		videoUrl: React.PropTypes.string.isRequired,
		onClick: React.PropTypes.func,
	};

    render() {
        const {imgSrc, title, videoUrl, onClick} = this.props;

        return (
            <li onClick={onClick(title, videoUrl)}>
                <img src={imgSrc}/>
                <p>{title}</p>
            </li>
        );
    }
}
