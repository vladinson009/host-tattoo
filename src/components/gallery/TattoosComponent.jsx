import { useContext, useState } from "react";

import context from "../../context/context";
import useFetchData from "../../hooks/useFetchData";

import TattooCard from "./TattooCard";
import Spinner from "../partials/Spinner";
import Toast from "../partials/Toast";
import NoContent from "../partials/NoContent";

export default function TattoosComponent({ fetchData, title }) {
    const { userSession } = useContext(context)
    const [tattoos, setTattoos] = useState([]);
    const { isLoading, error } = useFetchData(fetchData, setTattoos, userSession?._id)

    if (isLoading) return <Spinner />
    return (
        <>
            {error && <Toast message={error} />}
            <section className="min-h-[calc(100vh-4rem-4rem)] text-white py-16 ">
                <div className="container mx-auto px-6 ">
                    <h2 className="text-4xl font-black mb-12 drop-shadow-lg text-center pt-16">{title}</h2>
                    {tattoos.length > 0 ? <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]  place-items-center gap-20 md:gap-25 lg:gap-30 px-6">
                        {tattoos.map((tattoo) => (
                            <TattooCard key={tattoo.objectId} tattoo={tattoo} setTattoos={setTattoos} />
                        ))}
                    </div>
                        : <NoContent content="Nothing in wishlist yet..." />}
                </div>
            </section>
        </>
    )
}