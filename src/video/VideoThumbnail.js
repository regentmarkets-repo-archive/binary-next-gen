import React from 'react';
import { connect } from 'react-redux';
import * as VideoActions from '../_actions/VideoActions';

export default class VideoThumbnail extends React.Component {

    render(){
        const imgSrc = this.props.imgSrc;
        const title = this.props.title;
        const videoUrl = this.props.videoUrl;
        return (
            <li onClick={this.props.onClick(title, videoUrl)}>
                <img src={imgSrc}/>
                <p>{title}</p>
            </li>
        );
    }
}
