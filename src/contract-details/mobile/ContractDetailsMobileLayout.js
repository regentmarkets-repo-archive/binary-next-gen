import React, { PropTypes, PureComponent } from 'react';
import { Tab, TabList } from 'binary-components';

export default class ContractDetailsMobileLayout extends PureComponent {

    static propTypes = {
        chartComponent: PropTypes.object.isRequired,
        detailsComponent: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
    }

    changeView = newIndex => this.setState({ activeIndex: newIndex });

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
