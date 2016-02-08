import { createStructuredSelector } from 'reselect';

export const signinSelector = state => state.signin;
export const tokenSelector = state => state.account.get('token');

export default createStructuredSelector({
    signin: signinSelector,
    token: tokenSelector,
});
