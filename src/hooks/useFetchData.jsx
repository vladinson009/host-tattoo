import { useEffect, useState } from "react";



export default function useFetchData(callback, ...arg) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                setIsLoading(true);
                const result = await callback(...arg, controller.signal)
                setData(result);
            } catch (error) {
                setError(error.message)
                return error.message

            } finally {
                setIsLoading(false);
            }

            return () => controller.abort();
        })()


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return { data, isLoading, setData, error }
}