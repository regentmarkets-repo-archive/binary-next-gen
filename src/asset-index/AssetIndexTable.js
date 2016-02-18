import React, { PropTypes, Component } from 'react';
import AssetIndexRow from './AssetIndexRow';

export default class AssetIndexTable extends Component {

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
                        {headers.map((type, idx) =>
                            <th key={idx}>{type}</th>
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
