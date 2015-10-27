import React from 'react';
// import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../_constants/ActionTypes';
 import store from '../_store/configureStore';

 // @connect(state => ({ account: state.account }))
class App extends React.Component {
    render() {
        const mapDispatch = dispatch => ({ actions: bindActionCreators(actions, dispatch) });
        return (
            <div>
            {this.props.children}
            </div>
        );
    }
}

// const mapState = state => ({ todos: state.todos });

 const mapDispatch = dispatch => ({ actions: bindActionCreators(actions, dispatch) });

export default App;// connect(state, mapDispatch)(App);
