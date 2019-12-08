import React from 'react';
import { useParams } from 'react-router-dom';


export default () => {
    const { videoId } = useParams();

    return (
        <h2>{videoId}</h2>
    )
}