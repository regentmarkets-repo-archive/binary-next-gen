import React from 'react';
import ReactDOM from 'react-dom';

export default class SizeProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: '100px',
            width: '800px',
        };
    }

    static propTypes = {
        children: React.PropTypes.object,
    };

    componentDidMount() {
        // const node = ReactDOM.findDOMNode(this);
        // this.setState({
        //     width: node.clientWidth,
        //     height: node.clientHeight,
        // });
        window.addEventListener('resize', ::this.onResize, true);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', ::this.onResize);
    }

    onResize() {
        const targetDOM = ReactDOM.findDOMNode(this);
        this.setState({ height: targetDOM.clientHeight, width: targetDOM.clientWidth });
    }

    render() {
        const { children } = this.props;
        const { height, width } = this.state;
        return (
            <div {...this.props}>
                {
                    React.Children.map(children, child => React.cloneElement(child, { style: { height, width } }))
                }
            </div>
        );
    }
}
