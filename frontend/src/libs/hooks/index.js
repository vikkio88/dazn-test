import { useState, useEffect } from 'react';
function useFetch(promise) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    async function fetchUrl() {
        try {
            const response = await promise;
            const json = await response.data;
            setData(json);
        } catch (error) {
            console.error(error)
            setData(null);
        } finally {
            setLoading(false);
        }

    };
    useEffect(() => { fetchUrl(); }, []);
    return [data, isLoading];
}
export { useFetch };