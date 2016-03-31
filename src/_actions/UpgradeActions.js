import { UPGRADE_FIELD_UPDATE, UPGRADE_DOB_UPDATE, UPGRADE_FIELD_CLEAR } from '../_constants/ActionTypes';
import * as LiveData from '../_data/LiveData';
import config from '../config';

export const upgradeFieldUpdate = (fieldName, fieldValue) => ({
    type: UPGRADE_FIELD_UPDATE,
    fieldName,
    fieldValue,
});

export const upgradeDOBUpdate = (dayMonthOrYear, val) => ({
    type: UPGRADE_DOB_UPDATE,
    dayMonthOrYear,
    val,
});

export const upgradeConfirm = async () =>
    async (dispatch, getState) => {
        const { upgrade } = getState();
        const {
            salutation,
            firstName,
            lastName,
            dateOfBirth,
            residence,
            addressLine1,
            addressLine2,
            addressCity,
            addressState,
            addressPostcode,
            phone,
            secretQuestion,
            secretAnswer,
        } = upgrade.toJS();

        const opts = {
            salutation,
            residence,
            phone,
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirth.toISOString().slice(0, 10),
            address_line_1: addressLine1,
            address_line_2: addressLine2,
            address_city: addressCity,
            address_state: addressState,
            address_postcode: addressPostcode,
            secret_question: secretQuestion,
            secret_answer: secretAnswer,
            affiliate_token: config.affiliateToken,
        };

        try {
            await LiveData.api.createRealAccount(opts);
            dispatch({ type: UPGRADE_FIELD_CLEAR });
            dispatch(upgradeFieldUpdate('success', true));
        } catch (e) {
            dispatch(upgradeFieldUpdate('error', e.message));
        } finally {
            dispatch(upgradeFieldUpdate('progress', false));
        }
    };
