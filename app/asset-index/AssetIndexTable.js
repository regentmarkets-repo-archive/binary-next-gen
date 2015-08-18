import React from 'react';
import AssetIndexRow from './AssetIndexRow';

export default class AssetIndexTable {

    static propTypes = {
		submarket: React.PropTypes.string.isRequired,
        assets: React.PropTypes.array.isRequired,
	};

    render() {
        const { submarket, assets } = this.props;

        window.console.log('submarket', submarket);

        return (
            <table>
                <thead>
                    <tr>
                        <th colSpan="100">
                            {submarket}
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>Up/<wbr/>Down</th>
                        <th>Touch/<wbr/>No Touch</th>
                        <th>Ends Between/<wbr/>Outside</th>
                        <th>Stays Between/<wbr/>Goes Outside</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((a, i) => <AssetIndexRow key={i} symbol={a.symbol_display} />)}
                </tbody>
            </table>
        );
    }
}
