import React from 'react';
import { connect } from 'react-redux';
import VideoList from './VideoList';

@connect(state => ({video: state.video}))
export default class VideoListContainer extends React.Component {

    static propTypes = {
		video: React.PropTypes.object.isRequired,
	};

    render() {
        return (
            <VideoList {...this.props} />
        );
    }
}
