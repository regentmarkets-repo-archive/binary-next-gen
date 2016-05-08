import React from 'react';

export default (components, className, onClick) => (
    <div className={className + ' horizontal'} onClick={onClick}>
        <div>
            {components[0]}
            {components[1]}
        </div>
        <div>
            {components[2]}
            {components[3]}
        </div>
    </div>
);
