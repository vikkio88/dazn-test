import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useFetch } from 'libs/hooks';
import { catalogService } from 'libs/api';

import { StreamUpgrade } from 'components/promo';

const releaseStream = streamId => () => {
    // we do not care about the response
    catalogService.unregisterStream(streamId);
};

export default () => {
    const { streamId } = useParams();
    const [data, isLoading, error] = useFetch(catalogService.getStream(streamId), true);
    useEffect(() => {
        window.addEventListener('beforeunload', releaseStream(streamId));

        // this is the hook equivalent of componentDidUnMount
        return releaseStream(streamId);
    }, []);

    return (
        <>
            {isLoading && 'Loading...'}
            {(!isLoading && error) && (
                <StreamUpgrade error={error} />
            )}
            {(!isLoading && !error) && (
                <>
                    <span>{data.sport}</span>
                    <h3>{data.label}</h3>
                    <video src={data.fileUrl} controls />
                </>
            )}
        </>
    )
}

//@TODO Need to call the endpoint to release the slot on BE on beforeUnmout
//@TODO Need to remember to manage the unload event in order to remove the stream from there too