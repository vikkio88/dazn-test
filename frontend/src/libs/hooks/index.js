import { useState, useEffect } from 'react';
export const useFetch = (promise, handleError = null) => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    async function fetchUrl() {
        try {
            const response = await promise;
            const json = await response.data;
            setData(json);
        } catch (error) {
            console.error(error.response)
            if (handleError) {
                setError(error.response.data.message);
            }
            setData(null);
        } finally {
            setLoading(false);
        }

    };
    useEffect(() => { fetchUrl(); }, []);
    return [data, error, isLoading];
}
export const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        reset: () => setValue(""),
        bind: {
            value,
            onChange: event => {
                setValue(event.target.value);
            }
        }
    };
};
