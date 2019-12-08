import React from 'react';
import { Item } from 'components/catalog';

import { useFetch } from 'libs/hooks';
import { catalogService } from 'libs/api';

import './Dashboard.css';

export default () => {
    const [data, isLoading] = useFetch(catalogService.getLive());
    return (
        <>
            {isLoading && 'Loading...'}
            {!isLoading && (
                <div className="catalog">
                    {(data && data.length > 0) ? data.map(i => (
                        <Item key={i.streamId} {...i} />
                    )): <h3>No Live Events</h3>}
                </div>
            )}
        </>
    )
};