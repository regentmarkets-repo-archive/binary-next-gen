import React from 'react';
import ReactDOM from 'react-dom';

export default class SizeProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: '600px',
            width: '1000px',
        };
    }

    static propTypes = {
        children: React.PropTypes.object,
    };

    componentDidMount() {
        window.onresize = () => this.onResize(this);
    }

    componentWillUnmount() {
        window.onresize = null;
    }

    onResize(ele) {
        const targetDOM = ReactDOM.findDOMNode(ele);
        ele.setState({ height: targetDOM.clientHeight, width: targetDOM.clientWidth });
    }

    render() {
        const { children } = this.props;
        const { height, width } = this.state;
        const updatedChildren = React.Children
            .map(children, child => React.cloneElement(child, { style: { height, width } }));
        return <div>{updatedChildren}</div>;
    }
}
