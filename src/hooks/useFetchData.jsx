import { useQuery } from "@tanstack/react-query";

export default function useFetchData(callback, key, ...arg) {
    async function queryFn() {
        try {
            const controller = new AbortController();
            return await callback(...arg, controller.signal)
        } catch (err) {
            throw new Error('Error fetching data', err)
        }
    }
    const { data, error, isLoading } = useQuery({
        queryKey: [key],
        queryFn,
    })
    return { data, isLoading, error, }
}