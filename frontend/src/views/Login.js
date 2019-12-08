import React from 'react';
import { connect } from 'react-redux';
import { useInput } from 'libs/hooks';
import { login } from 'store/actions';
import { Input, Button } from 'components/common';

import './Login.css';

const Login = ({ error, login }) => {
    const { value: username, bind: bindUsername } = useInput('');
    const { value: password, bind: bindPassword } = useInput('');

    return (
        <>
            <h3>Login</h3>
            <div className="form">
                <Input placeholder="Username" {...bindUsername} />
                <Input type="password" placeholder="Password" {...bindPassword} />
            </div>
            <div className="actions">
                <Button label="Login" onClick={() => login(username, password)} />
            </div>
            {error && <span className="error">{error}</span>}
        </>
    );
};

const stateToProps = ({ app }) => {
    const { error } = app;
    return {
        error
    };
};

const dispatchToProps = dispatch => {
    return {
        login(username, password) {
            dispatch(login(username, password));
        }
    };
};

export default connect(
    stateToProps,
    dispatchToProps
)(Login);