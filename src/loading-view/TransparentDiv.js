import React, { PureComponent, PropTypes } from 'react';

export class TransparentDiv extends PureComponent {
    render() {
        return (
            <div style={{
                height: '100%',
                width: '100%',
                zIndex: '100',
                opacity: 0.3,
            }}></div>
        );
    }
}
