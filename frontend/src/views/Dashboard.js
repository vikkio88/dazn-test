import React from 'react';
import { Item } from 'components/catalog';

import './Dashboard.css';

export default () => {
    const items = [];
    return (
        <>
            <div className="catalog">
                {items.map(i => (
                    <Item key={i.streamId} {...i} />
                ))}
            </div>
        </>
    )
};