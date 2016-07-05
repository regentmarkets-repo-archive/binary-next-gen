import WebPage from '../containers/WebPage';

export default (props) => (
    <WebPage toolbarShown={false} inverse>
        <HelloCard {...props} />
    </WebPage>
);

