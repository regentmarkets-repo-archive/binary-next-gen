import React from 'react';


export default ({title, imgSrc, url}) => (
    <li>
        <img src={imgSrc}/>
        <p>{title}</p>
    </li>
);
