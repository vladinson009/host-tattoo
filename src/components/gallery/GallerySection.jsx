import { useContext, useEffect, useState } from "react";

import TattooCard from "./TattooCard";
import Spinner from "../partials/Spinner";
import Toast from "../partials/Toast";
import NoContent from "../partials/NoContent";
import galleryService from "../../services/galleryService";
import useSearchBar from "../../hooks/useSearchBar";
import SearchBar from "./SearchBar";
import SubmitFormButton from "../partials/form/SubmitFormButton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import context from "../../context/context";

export default function GallerySection() {
    const { count, setCount, isMore, setIsMore } = useContext(context);
    const queryClient = useQueryClient();
    const [pagination, setPagination] = useState({ skip: 0, limit: 8 });
    const { data, isLoading, error } = useQuery({
        queryKey: ['getGallery'],
        queryFn: async () => {
            const [count, data] = await Promise.all([
                galleryService.getCountGallery(),
                galleryService.getGallery(pagination.skip, pagination.limit)
            ])
            setCount(count);
            if (count > data.length) {
                setIsMore(true)
            }
            return data
        }, staleTime: Infinity
    })
    const { query,
        setQuery,
        onSearch,
        filteredData,
        loadMore, isPending,
        onScrollUp, error: searchErr,

    } = useSearchBar(data, pagination, setPagination, setIsMore);

    useEffect(() => {
        if (!isMore) { return }
        queryClient.invalidateQueries(['getGallery']); // Reset cache before fetching
    }, [queryClient, isMore]);
    // gallery section with all tattoo with possibility for filtering, load more and scroll to top
    if (isLoading) return <Spinner />
    return (
        <>
            {error && <Toast message={error} />}
            {searchErr && <Toast message={searchErr} />}
            <section className="min-h-[calc(100vh-4rem-4rem)] text-white py-16 ">
                <div className="container mx-auto px-6 ">
                    <h2 className="text-4xl font-black mb-12 drop-shadow-lg text-center pt-16">Our Tattoo Gallery</h2>
                    <SearchBar onSearch={onSearch} query={query} setQuery={setQuery} />
                    <p>Results {filteredData?.length} of {count}</p>
                    {filteredData?.length > 0 ? <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]  place-items-center gap-20 md:gap-25 lg:gap-30 px-6">
                        {filteredData.map((tattoo) => (
                            <TattooCard key={tattoo.objectId} tattoo={tattoo} />
                        ))}
                    </div>
                        : <NoContent content="Nothing in Gallery yet..." />}
                </div>
                <div className="flex justify-center mt-8">
                    {isMore
                        ? <SubmitFormButton textContent="Load more" isPending={isPending} clickHandler={loadMore} />
                        : <SubmitFormButton textContent="Scroll to top" isPending={isPending} clickHandler={onScrollUp} />
                    }

                </div>
            </section>
        </>
    )
}