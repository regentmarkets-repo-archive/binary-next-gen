import React, { PureComponent } from 'react';
import { Button, Th } from 'binary-components';

export default class JpTradeCard extends PureComponent {

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
