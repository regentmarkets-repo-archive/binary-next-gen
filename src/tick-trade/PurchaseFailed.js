import React from 'react';

const PurchaseFailed = ({failure}) => (
    <div>
        <h4>{failure.code}</h4>
        <p>{failure.message}</p>
    </div>
);

export default PurchaseFailed;
