import React, { PropTypes, PureComponent } from 'react';
import AssetPickerItem from './AssetPickerItem';
import AssetPickerHeader from './AssetPickerHeader';

export default class AssetsPerSubmarket extends PureComponent {
    static propTypes = {
        assetsInSubmarket: PropTypes.array.isRequired,
        selectedAsset: PropTypes.string.isRequired,
        onClose: PropTypes.func,
    };

    render() {
        const { assetsInSubmarket, selectedAsset } = this.props;
        const { submarket, market } = assetsInSubmarket[0];
        return (
            <table>
                <AssetPickerHeader
                    key={submarket}
                    market={market}
                    submarket={submarket}
                />
                <tbody>
                    {assetsInSubmarket.map(a =>
                        <AssetPickerItem
                            {...this.props}
                            key={a.symbol}
                            asset={a}
                            selected={selectedAsset === a.symbol}
                        />
                    )}
                </tbody>
            </table>
        );
    }
}
