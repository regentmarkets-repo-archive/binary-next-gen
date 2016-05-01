import React from 'react';

export default (components, className, onClick) => (
    <div className={className} onClick={onClick}>
        {components[0]}
        {components[1]}
        {components[2]}
        {components[3]}
    </div>
);
