import React, { PureComponent } from 'react';
import AssetsPerSubmarket from './AssetsPerSubmarket';

export default class AssetPickerList extends PureComponent {
    props: {
        assets: Asset[],
    };

    render() {
        const { assets } = this.props;
        return (
            <div className="asset-list scrollable">
                {assets.map(grouped => (
                    <AssetsPerSubmarket
                        {...this.props}
                        key={grouped[0].submarket}
                        assetsInSubmarket={grouped}
                    />
                ))}
            </div>
        );
    }
}
