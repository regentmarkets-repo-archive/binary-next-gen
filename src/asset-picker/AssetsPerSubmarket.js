import React, { PropTypes, Component } from 'react';
import AssetPickerItem from './AssetPickerItem';
import AssetPickerHeader from './AssetPickerHeader';

export default class AssetsPerSubmarket extends Component {
    static propTypes = {
        assetsInSubmarket: PropTypes.array.isRequired,
        selectedAsset: PropTypes.string.isRequired,
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
                {assetsInSubmarket.map(a =>
                    <AssetPickerItem
                        {...this.props}
                        key={a.symbol}
                        asset={a}
                        selected={selectedAsset === a.symbol}
                        ref={selectedAsset === a.symbol ? 'focused' : null}
                    />
                )}
            </table>
        );
    }
}
