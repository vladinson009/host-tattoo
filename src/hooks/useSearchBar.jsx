import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import galleryService from "../services/galleryService";

export default function useSearchBar(data, setData, pagination, setPagination) {
    const navigate = useNavigate();
    const [filteredData, setFilteredData] = useState(data);

    const [query, setQuery] = useState('');
    const [isMore, setIsMore] = useState(true);
    const [isPending, setIsPending] = useState(false);

    // scroll to the top on click
    function onScrollUp() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // load more data(pagination)
    async function loadMore() {
        try {
            setIsPending(true);
            setPagination((prev) => ({ skip: prev.skip + 8, limit: 8 }));
            const newFetch = await galleryService.getGallery(pagination.skip + 8, pagination.limit);
            if (newFetch.length < 8) {
                setIsMore(false);
            }
            setData((prev) => [...prev, ...newFetch]);

        } catch (error) {
            //TODO error handling
            console.log(error.message);

        } finally {
            setIsPending(false);
        }
    }
    // search function filtering already fetched data & updating url
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
        const params = new URLSearchParams(window.location.search);
        const searchQuery = params.get("search") || "";
        if (searchQuery) {
            const filtered = data.filter((tattoo) =>
                tattoo.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    }, [data]);


    return {
        query,
        setQuery,
        onSearch,
        filteredData,
        loadMore,
        isPending,
        isMore,
        onScrollUp
    };
}