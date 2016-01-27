import React, { PropTypes } from 'react';
import AssetIndexRow from './AssetIndexRow';

export default class AssetIndexTable extends React.Component {

    static propTypes = {
        headers: PropTypes.array.isRequired,
        durations: PropTypes.array.isRequired,
    };

    render() {
        const { headers, durations } = this.props;

        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {headers.map((assetName, idx) =>
                            <th key={idx}>{assetName}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {durations.map((duration, idx) =>
                        <AssetIndexRow
                            key={idx}
                            assetName={duration.assetName}
                            times={duration.times}
                        />
                    )}
                </tbody>
            </table>
        );
    }
}
