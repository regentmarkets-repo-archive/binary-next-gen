import {connect} from 'react-redux';
import React from 'react';
import Panel from '../_common/Panel';
import ButtonList from './ButtonList';
import DailyReportData from '../_data/DailyReportData';
import * as DailyReportActions from '../_actions/DailyReportActions';

@connect(state => ({dailyReport: state.dailyReport}))
export default class DailyReportPage extends React.Component {

    static propTypes = {
        dailyReport: React.PropTypes.object.isRequired,
        dispatch: React.PropTypes.func.isRequired,
    };

    injectDailyReport(content) {
        return {__html: content};
    }

    componentDidMount() {
        DailyReportData.getDailyReport().then((reports) => {
            this.props.dispatch(DailyReportActions.updateCurrentDailyReport(reports[0]));
            this.props.dispatch(DailyReportActions.updateDailyReportList(reports));
        });
    }

    render() {
        const newsAndAnalysis = [{text: 'News', onClick: () => {}}, {text: 'Analysis', onClick: () => {}}];
        const dailyReport = this.props.dailyReport;

        const currentDailyReport = dailyReport.get('current');
        return (
            <Panel position={{left: 27, top: 52, width: 800, height: 545 }}>
                <ButtonList
                    buttonsInfo={newsAndAnalysis}
                    />
                <h2>{currentDailyReport.title}</h2>
                <p>{currentDailyReport.pubDate}</p>
                <div dangerouslySetInnerHTML={::this.injectDailyReport(currentDailyReport.content)}></div>
            </Panel>
        );
    }
}
