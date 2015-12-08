import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import VideoList from './VideoList';

@connect(state => ({ video: state.video }))
export default class VideoListContainer extends React.Component {

    static propTypes = {
		video: PropTypes.object.isRequired,
	};

    render() {
        return (
            <VideoList {...this.props} />
        );
    }
}
