import React, { PureComponent } from 'react';

export default class AssetIndexRow extends PureComponent {

    props: {
        assetName: string,
        times: any[],
    };

    render() {
        const { assetName, times } = this.props;

        return (
            <tr>
                <td className="row-id">
                    {assetName}
                </td>
                {times.map((time, k) =>
                    <td className="date" key={k}>
                        {time}
                    </td>
                )}
            </tr>
        );
    }
}
