import React, { PureComponent } from 'react';
import { Tab, TabList } from 'binary-components';

type Props = {
    chartComponent: object,
    detailsComponent: object,
};

export default class ContractDetailsMobileLayout extends PureComponent {

    props: Props;

    constructor(props: Props) {
        super(props);
        this.state = { activeIndex: 0 };
    }

    changeView = (newIndex: number) =>
        this.setState({ activeIndex: newIndex });

    render() {
        const { chartComponent, detailsComponent } = this.props;
        const { activeIndex } = this.state;

        return (
            <div>
                <TabList
                    activeIndex={activeIndex}
                    onChange={this.changeView}
                >
                    <Tab text="Chart" />
                    <Tab text="Details" />
                </TabList>
                {activeIndex === 0 && chartComponent}
                {activeIndex === 1 && detailsComponent}
            </div>
        );
    }
}
