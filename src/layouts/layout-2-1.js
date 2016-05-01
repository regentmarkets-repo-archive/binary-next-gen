import React from 'react';

export default (components, className, onClick) => (
    <div className={className} onClick={onClick}>
        {components[0]}
        {components[1]}
    </div>
);
