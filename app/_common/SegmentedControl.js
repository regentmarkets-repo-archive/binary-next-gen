import React from 'react';
import Segment from './Segment';

const SegmentedControl = props => {
    const segments = (typeof props.segments[0] !== 'string')
        ? props.segments
        : props.segments.map(s => ({ href: '#', text: s }));

    return (
        <ul role="segmented">
            {segments.map((segment, idx) =>
                <Segment
                    key={idx}
                    href={segment.href}
                    text={segment.text}
                    active={idx === props.activeIndex} />
            )}
        </ul>
    );
};

SegmentedControl.propTypes = {
    segments: React.PropTypes.array.isRequired,
    activeIndex: React.PropTypes.number.isRequired,
    onSelect: React.PropTypes.func,
};

export default SegmentedControl;
