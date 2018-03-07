import * as types from '../_constants/ActionTypes';

export const updateSupportedLanguages = (languages: Array) => ({
    type: types.UPDATE_SUPPORTED_LANGUAGES,
    languages,
});
