import React from 'react';
import AssetIndexRow from './AssetIndexRow';

export default class AssetIndexTable {

    static propTypes = {
		submarket: React.PropTypes.string.isRequired,
	};

    render() {
        const { submarket } = this.props;

        return (
            <table>
                <thead>
                    <tr>
                        <th colSpan="100">
                            {submarket.submarket}
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
                    {submarket.available.map((a, i) => <AssetIndexRow key={i} symbol={a.symbol_display} />)}
                </tbody>
            </table>
        );
    }
}
