import React, { Component } from 'react';
import Button from 'binary-components/lib/Button';
import Th from 'binary-components/lib/Th';

export default class JpTradeCard extends Component {

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <Th text="Excercise price" />
                        <Th text="Higher" />
                        <Th text="Lower" />
                    </tr>
                </thead>
                <tbody>
                    {Array.from(new Array(10)).map((x, idx) =>
                        <tr key={idx}>
                            <td>81.777</td>
                            <td>
                                1,000<Button className="btn-secondary" text="Buy" />
                                &nbsp;20 <Button className="btn-secondary" text="Sell" />
                            </td>
                            <td>
                                1,000<Button className="btn-secondary" text="Buy" />
                                &nbsp;20 <Button className="btn-secondary" text="Sell" />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}
