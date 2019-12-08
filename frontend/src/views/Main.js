import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar } from 'components/nav';
import { Dashboard, Login, Stream } from './';
import { checkExistingSession } from 'store/actions';

class Main extends Component {
    componentWillMount() {
        this.props.checkExistingSession();
    }
    render() {
        const { isLoggedIn } = this.props;
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="App-body">
                        <Switch>
                            <Route exact path="/" component={Dashboard} />
                            <Route path="/login" component={Login} />
                            <Route
                                path="/stream/:videoId"
                                component={props =>
                                    !isLoggedIn ? <Redirect to="/login" /> : <Stream {...props} />
                                }
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

const stateToProps = ({ app }) => {
    const { user, loading, error } = app;
    return {
        isLoggedIn: user !== null,
        loading,
        error
    };
};

const dispatchToProps = dispatch => {
    return {
        checkExistingSession() {
            dispatch(checkExistingSession());
        }
    };
};

export default connect(
    stateToProps,
    dispatchToProps
)(Main);
