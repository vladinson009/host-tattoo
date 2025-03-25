import { useQuery } from "@tanstack/react-query";

export default function useFetchData(callback, ...arg) {
    async function queryFn() {
        try {
            const controller = new AbortController();
            return await callback(...arg, controller.signal)
        } catch (err) {
            throw new Error('Error fetching data', err)
        }
    }
    const { data, error, isLoading } = useQuery({
        queryKey: [callback.name],
        queryFn,
    })
    return { data, isLoading, error, }

}