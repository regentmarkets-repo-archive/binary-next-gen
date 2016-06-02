import React from 'react';

export default (components, className, onClick) => (
    <div className={className + ' vertical'} onClick={onClick}>
        {components[0]}
    </div>
);
