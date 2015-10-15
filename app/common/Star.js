import React from 'react';

export default ({on, onClick}) => (
    <span onClick={onClick} style={{ fontSize: '1.5rem' }}>
        {on ? '★' : '☆'}
    </span>
);
