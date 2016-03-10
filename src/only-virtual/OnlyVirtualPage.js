import React from 'react';
import { showError } from '../_utils/MessagingUtils';

export default class OnlyVirtualPage extends React.Component {
    render() {
        showError('This site currently in Beta version, only Virtual Accounts are allowed.');
        return <div></div>;
    }
}
