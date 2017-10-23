import React, { PureComponent } from 'react';
import '../layouts/layouts.css';
import LayoutButton from './LayoutButton';
import { layoutNumbers } from './layouts';

export default class LayoutButtonList extends PureComponent {

    props: {
        tradesCount: number,
        layoutN: number,
    };

    render() {
        const { tradesCount, layoutN } = this.props;

        return (
            <div className={'layoutBtnList'}>
                {layoutNumbers().map(x =>
                    <LayoutButton
                        key={`${x.trade}-${x.layout}`}
                        isActive={tradesCount === x.trade && layoutN === x.layout}
                        tradesCount={x.trade}
                        layoutN={x.layout}
                    />
                )}
            </div>
        );
    }
}
