import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DetailsSection() {
    const { tattooId } = useParams(); // Get the tattoo id from the URL
    const [tattoo, setTattoo] = useState(null);

    useEffect(() => {
        fetch('https://dummyjson.com/recipes/' + tattooId)
            .then(res => res.json())
            .then(result => {
                setTattoo(result);
            });
    }, [tattooId]);

    if (!tattoo) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-white bg-black p-6">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-6">Tattoo Details</h2>

                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="w-full sm:w-1/2 mb-8 sm:mb-0">
                        <img
                            src={tattoo.image}
                            alt="DummyName"
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="w-full sm:w-1/2 sm:pl-8">
                        <h3 className="text-2xl font-semibold mb-4">Tattoo DummyNumber</h3>
                        <p className="text-lg mb-4">Artist: DummyArtist</p>
                        <p className="text-lg mb-4">DummyDescription</p>
                    </div>
                </div>

                <div className="mt-12">
                    <a
                        href="/gallery"
                        className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition duration-300"
                    >
                        Back to Gallery
                    </a>
                </div>
            </div>
        </section>
    );
}
