import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';

const BaseContainerCreator = (selector, Component) =>
    @connect(selector)
    export default class BaseContainer extends React.Component {

    	shouldComponentUpdate = shouldPureComponentUpdate;

    	render() {
    		return (
    			<Component {...immutableChildrenToJS(this.props)} />
    		);
    	}
    }
}
