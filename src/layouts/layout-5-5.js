import React from 'react';

export default (components, className, onClick) => (
    <div className={className} onClick={onClick}>
        <div className="vertical">
            {components[0]}
            {components[1]}
            {components[2]}
        </div>
        <div className="vertical">
            {components[3]}
            {components[4]}
        </div>
    </div>
);
