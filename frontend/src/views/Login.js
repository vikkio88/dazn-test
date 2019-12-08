import React from 'react';
import { Input, Button } from 'components/common';

import './Login.css';

export default () => {

    return (
        <>
            <h3>Login</h3>
            <div className="form">
                <Input placeholder="Username" />
                <Input type="password" placeholder="Password" />
            </div>
            <div className="actions">
                <Button label="Login" />
            </div>
        </>
    );
};