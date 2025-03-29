import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import galleryService from "../services/galleryService";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default function useSearchBar(data, pagination, setPagination, setIsMore) {
    const queryClient = useQueryClient()

    const navigate = useNavigate();
    const { search } = useLocation();
    const [filteredData, setFilteredData] = useState(data);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");

    // scroll to the top on click
    function onScrollUp() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // load more data(pagination)
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            setPagination((prev) => ({ skip: prev.skip + 8, limit: 8 }));
            const newFetch = await galleryService.getGallery(
                pagination.skip + 8,
                pagination.limit
            );
            return newFetch;
        }, onSuccess: (newFetch) => {
            if (newFetch.length < 8) {
                setIsMore(false);
            }
            queryClient.setQueryData(["getGallery"], (prevData = []) => [
                ...prevData,
                ...newFetch,
            ]);

        }, onError: (error) => {
            setError(error.message);
        },
    })

    function onSearch(query) {
        const params = new URLSearchParams();
        if (query) {
            params.set("search", query);
        } else {
            params.delete("search");
        }
        const filtered = data.filter((tattoo) =>
            tattoo.title.toLowerCase().includes(query.toString().toLowerCase())
        );
        setFilteredData(filtered);
        navigate({ search: params.toString() });
    };
    // check if there is a search query in url and filter data accordingly
    useEffect(() => {

        const params = new URLSearchParams(search);
        const searchQuery = params.get("search") || "";
        setQuery(searchQuery)
        if (searchQuery) {
            const filtered = data?.filter((tattoo) =>
                tattoo.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    }, [data, search]);

    return {
        query,
        setQuery,
        onSearch,
        filteredData,
        loadMore: mutate,
        isPending,
        onScrollUp,
        error,
    };
}