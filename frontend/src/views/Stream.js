import React from 'react';
import { useParams } from 'react-router-dom';

import { useFetch } from 'libs/hooks';
import { catalogService } from 'libs/api';

import { StreamUpgrade } from 'components/promo';


export default () => {
    const { streamId } = useParams();
    const [data, error, isLoading] = useFetch(catalogService.getStream(streamId), true);

    return (
        <>
            {isLoading && 'Loading...'}
            {(!isLoading && error) && (<StreamUpgrade error={error} />)}
            {(!isLoading && !error) && <>{JSON.stringify(data)}</>}
        </>
    )
}