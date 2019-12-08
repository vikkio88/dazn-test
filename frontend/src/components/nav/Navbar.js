import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loggedOut } from 'store/actions';
import { Button } from 'components/common';

import './Navbar.css';


const Navbar = ({ isLoggedIn, logout }) => {
    return (
        <header className="header">
            <Link to="/">
                <img src="/logo192.png" className="logo" alt="logo" />
            </Link>
            <div className="nav">
                <div className="user">
                    {!isLoggedIn && (
                        <Link to="/login">
                            <Button label="Login" />
                        </Link>
                    )}
                    {isLoggedIn && <Button label="Profile" />}
                    {isLoggedIn && <Button accent label="Logout" onClick={() => logout()} />}
                </div>
            </div>
        </header>
    )
};

const stateToProps = ({ app }) => {
    const { user } = app;
    return {
        isLoggedIn: user !== null
    };
};

const dispatchToProps = dispatch => {
    return {
        logout() {
            dispatch(loggedOut());
        }
    };
};

export default connect(
    stateToProps,
    dispatchToProps
)(Navbar);