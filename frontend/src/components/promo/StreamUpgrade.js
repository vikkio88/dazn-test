import React from 'react';
import { Button } from 'components/common';


export default ({ error }) => {
    return (
        <>
            <h3>{error}</h3>
            <Button label="Upgrade to PRO" />
        </>
    );
}