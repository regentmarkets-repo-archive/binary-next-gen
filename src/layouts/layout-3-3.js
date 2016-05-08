import React from 'react';

export default (components, className, onClick) => (
    <div className={className} onClick={onClick}>
        <div className="vertical">
            {components[0]}
            {components[1]}
        </div>
        <div className="horizontal">
            {components[2]}
        </div>
    </div>
);
