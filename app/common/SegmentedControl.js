import React from 'react';
import Segment from './Segment';

export default class SegmentedControl extends React.Component {

    static propTypes = {
        segments: React.PropTypes.array.isRequired,
        onSelect: React.PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
        };
    }

    selected(idx) {
        this.setState({
            activeIndex: idx,
        });

        const { onSelect } = this.props;
        onSelect && onSelect(idx);
    }

    render() {
        const segments = (typeof this.props.segments[0] !== 'string')
            ? this.props.segments
            : this.props.segments.map(s => ({ href: '#', text: s }));

        return (
            <ul role="segmented">
                {segments.map((segment, idx) =>
                    <Segment
                        key={idx}
                        href={segment.href}
                        text={segment.text}
                        active={idx === this.state.activeIndex}
                        onSelect={this.selected.bind(this, idx)} />
                )}
            </ul>
        );
    }
}
