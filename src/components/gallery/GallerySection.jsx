import useFetchData from "../../hooks/useFetchData";
import { useState } from "react";

import TattooCard from "./TattooCard";
import Spinner from "../partials/Spinner";
import Toast from "../partials/Toast";
import NoContent from "../partials/NoContent";
import galleryService from "../../services/galleryService";
import useSearchBar from "../../hooks/useSearchBar";
import SearchBar from "./SearchBar";
import SubmitFormButton from "../partials/form/SubmitFormButton";

export default function GallerySection() {
    const [pagination, setPagination] = useState({ skip: 0, limit: 8 });
    const { data, isLoading, error } = useFetchData(galleryService.getGallery, 'getGallery', pagination.skip, pagination.limit);
    const { query, setQuery, onSearch, filteredData, loadMore, isPending, isMore, onScrollUp, error: searchErr } = useSearchBar(data, pagination, setPagination);

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
                    <p>Results {filteredData?.length} of {data.length}</p>
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