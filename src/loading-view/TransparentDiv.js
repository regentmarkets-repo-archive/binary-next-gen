import React, { PureComponent } from 'react';

export default class TransparentDiv extends PureComponent {
    render() {
        return (
            <div
                style={{
                    height: '100vh',
                    width: '100vw',
                    zIndex: '100',
                    backgroundColor: 'rgba(102, 102, 153, 0.1)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            />
        );
    }
}
