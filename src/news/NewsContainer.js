import React from 'react';
import {connect} from 'react-redux';
import NewsCard from './NewsCard';

@connect(state => ({ news: state.news }))
export default class NewsContainer extends React.Component {

    static propTypes = {
        news: React.PropTypes.object.isRequired,
    };

    // injectDailyReport(content) {
    //     return {__html: content};
    // }
    //
    // componentDidMount() {
    //     NewsData.getDailyReport().then((reports) => {
    //         this.props.dispatch(NewsActions.updateCurrentDailyReport(reports[0]));
    //         this.props.dispatch(NewsActions.updateDailyReportList(reports));
    //     });
    // }

    render() {
        return (
            <NewsCard {...this.props} />
        );
    }
}
