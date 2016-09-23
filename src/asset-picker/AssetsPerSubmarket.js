import React, { PureComponent } from 'react';
import AssetPickerItem from './AssetPickerItem';
import AssetPickerHeader from './AssetPickerHeader';

export default class AssetsPerSubmarket extends PureComponent {

    props: {
        assetsInSubmarket: any[],
        selectedAsset: string,
    };

    render() {
        const { assetsInSubmarket, selectedAsset } = this.props;
        const { submarketName, marketName } = assetsInSubmarket[0];
        return (
            <table>
                <AssetPickerHeader
                    key={submarketName}
                    market={marketName}
                    submarket={submarketName}
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
