import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actions } from '../_store';
import MobilePage from '../containers/MobilePage';
import AssetPickerContainer from './AssetPickerContainer';
import { assetPickerMobileSelector } from './AssetPickerSelectors';

@connect(assetPickerMobileSelector)
export default class AssetPickerMobile extends PureComponent {
    static contextTypes = {
        router: () => undefined,
    };

    componentWillMount() {
        actions.resetAssetPickerFilter();
    }

    onClose = () => {
        const { router } = this.context;
        router.goBack();
    };

    render() {
        return (
            <MobilePage toolbarShown={false} backBtnBarTitle="Asset">
                <AssetPickerContainer {...this.props} onClose={this.onClose} />
            </MobilePage>
        );
    }
}
