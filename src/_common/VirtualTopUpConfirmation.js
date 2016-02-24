import React, { PropTypes, Component } from 'react';
import { FormattedTime } from 'react-intl';
import { epochToDate } from '../_utils/DateUtils';
import M from './M';
import NumberPlain from './NumberPlain';


const TopUpConfirmation = ({ response }) => (
    <div>
        {response.error ?
            <M m={response.error} /> :
            <div>
                <NumberPlain currency={response.topup_virtual.currency} value={response.topup_virtual.amount}/>
                &nbsp;has been credited to your Virtual money account
            </div>
        }
        <div className="centerer">
            <button><M m="OK" /></button>
        </div>
    </div>
);

TopUpConfirmation.propTypes = {
    response: PropTypes.object.isRequired,
};

export default TopUpConfirmation;
