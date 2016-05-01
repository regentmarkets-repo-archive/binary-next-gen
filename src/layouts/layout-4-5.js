import React from 'react';

export default (components, className, onClick) => (
    <div className={className} onClick={onClick}>
        <div>
            {components[0]}
            {components[1]}
            {components[2]}
        </div>
        {components[3]}
    </div>
);
