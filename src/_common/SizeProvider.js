import React from 'react';

export default class SizeProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: '600px',
            width: '1000px',
        };
    }

    static propTypes = {
        windowSizeRelation: React.PropTypes.func.isRequired,
        height: React.PropTypes.string,
        width: React.PropTypes.string,
        children: React.PropTypes.object,
    };

    componentDidMount() {
        window.addEventListener('resize', e => this.onResize(this, e));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', e => this.onResize(this, e));
    }

    onResize(ele, e) {
        const newSize = ele.props.windowSizeRelation(e.target.innerWidth, e.target.innerHeight);
        ele.setState({ height: newSize.height, width: newSize.width });
    }

    render() {
        const { children } = this.props;
        const { height, width } = this.state;
        const updatedChildren = React.Children
            .map(children, child => React.cloneElement(child, { style: { height, width } }));
        return <div>{updatedChildren}</div>;
    }
}
