import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components/common';

import './Navbar.css';


export default () => {
    return (
        <header className="header">
            <Link to="/">
                <img src="/logo192.png" className="logo" alt="logo" />
            </Link>
            <div className="nav">
                <div className="user">
                    <Link to="/login">
                        <Button label="Login" />
                    </Link>
                </div>
            </div>

        </header>
    )
};