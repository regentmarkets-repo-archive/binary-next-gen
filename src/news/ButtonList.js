import React, { PropTypes } from 'react';

const ButtonList = ({ buttonsInfo }) => (
    <div className="button-list">
        {buttonsInfo.map((info, idx) =>
            <button onClick={info.onClick} key={idx}>
                {info.text}
            </button>
        )}
    </div>
);

ButtonList.propsType = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ButtonList;
