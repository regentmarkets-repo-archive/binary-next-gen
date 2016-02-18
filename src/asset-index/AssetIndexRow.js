import React, { PropTypes, Component } from 'react';

export default class AssetIndexRow extends Component {

    static propTypes = {
        assetName: PropTypes.string.isRequired,
        times: PropTypes.array.isRequired,
    };

    render() {
        const { assetName, times } = this.props;

        return (
            <tr>
                <td className="row-id">
                    {assetName}
                </td>
                {times.map((time, k) =>
                    <td key={k}>
                            {time}
                    </td>
                )}
            </tr>
        );
    }
}
