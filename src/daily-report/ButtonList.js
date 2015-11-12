import React from 'react';


const ButtonList = ({buttonsInfo}) => (
    <div className='button-list'>
        {buttonsInfo.map((info, idx) =>
            <button onclick={info.onClick} key={idx}>
                {info.text}
            </button>
        )}
    </div>
);

ButtonList.propsType = {
    text: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default ButtonList;