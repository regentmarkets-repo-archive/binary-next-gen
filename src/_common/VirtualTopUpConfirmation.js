import React, { PropTypes, Component } from 'react';
import { FormattedTime } from 'react-intl';
import { epochToDate } from '../_utils/DateUtils';
import M from './M';
import NumberPlain from './NumberPlain';


const TopUpConfirmation = ({ response, loginid }) => (

    !!(response.error)
        ?
        (<div>
            <table>
                <thead>
                <tr>
                   <th colSpan="2">{`Vitual Account Topup for ${loginid} failed`}</th>
                </tr>
                </thead>
                <tbody>
                <tr>

                    <td><M m={response.error} /> </td>
                </tr>
                </tbody>
            </table>
                <br/>
                <button><M m="Back" /></button>
            </div>
        )
    :
    (<div>
        <table>
            <tr>
                <th colSpan="2">{`Vitual Account Topup for ${loginid}`}</th>
            </tr>
            <tbody>
            <tr>
                <td><M m="currency" /></td>
                <td><M m={response.topup_virtual.currency} /> </td>
            </tr>
            <tr>
                <td><M m="Amount" /></td>
                <td>
                    <NumberPlain value={response.topup_virtual.amount} />
                </td>
            </tr>
            </tbody>
        </table>
        <br/>
        <button><M m="Back" /></button>
    </div>)
);


export default TopUpConfirmation;
