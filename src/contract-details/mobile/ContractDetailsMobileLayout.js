import React, { PropTypes, Component } from 'react';
import Tab from 'binary-components/lib/Tab';
import TabList from 'binary-components/lib/TabList';

export default class ContractDetailsMobileLayout extends Component {
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
