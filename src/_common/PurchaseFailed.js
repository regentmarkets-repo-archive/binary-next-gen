import React, { PropTypes } from 'react';

const PurchaseFailed = ({ failure }) => (
    <div>
        <h4>{failure.code}</h4>
        <p>{failure.message}</p>
    </div>
);

PurchaseFailed.propTypes = {
    failure: PropTypes.object,
};

export default PurchaseFailed;
