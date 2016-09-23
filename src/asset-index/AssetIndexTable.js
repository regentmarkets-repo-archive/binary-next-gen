import React, { PureComponent } from 'react';
import AssetIndexRow from './AssetIndexRow';

export default class AssetIndexTable extends PureComponent {

    props: {
        headers: any[],
        durations: any[],
    };

    render() {
        const { headers, durations } = this.props;

        return (
            <table>
                <thead>
                    <tr>
                        <th />
                        {headers.map((type, idx) =>
                            <th className="date" key={idx}>{type}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {durations.map((duration, idx) =>
                        <AssetIndexRow
                            key={idx}
                            assetName={duration[0]}
                            times={duration.slice(1)}
                        />
                    )}
                </tbody>
            </table>
        );
    }
}
