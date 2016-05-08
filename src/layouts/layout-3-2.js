import React from 'react';

export default (components, className, onClick) => (
    <div className={className + ' vertical'} onClick={onClick}>
        <div>
            {components[0]}
            {components[1]}
        </div>
        {components[2]}
    </div>
);
