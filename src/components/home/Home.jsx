import context from "../../context/context";
import { STUDIO_NAME, STUDIO_WELCOMEMSG } from "../../constants";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import NewsFeed from "./NewsFeed";
import userApi from "../../api/userApi";
export default function Home() {
    const { userSession } = useContext(context);
    // useEffect(() => {
    //     userApi.checkUserRoles(userSession?._id, 'Artist').then((user) => {
    //         // console.log(user);
    //     }
    //     );
    // }, []);
    return (
        <section
            id="home"
            className="min-h-screen flex flex-col items-center justify-center text-red-600 text-center p-6 pt-32 pb-32"
        >
            {/* Hero Title */}
            <h1 className="sm:text-3xl md:text-4xl lg:text-6xl font-black gothic drop-shadow-lg">{STUDIO_NAME}</h1>
            <p className="font-gothic sm:text-xl md:text-3xl lg:text-3xl mt-4 max-w-2xl">
                {STUDIO_WELCOMEMSG}
            </p>
            {/* Call to Action */}
            {userSession &&
                <Link to={"/booking"}
                    href="#booking"
                    className="mt-6 px-6 py-3 bg-red-600 text-black text-xl font-bold uppercase rounded-lg shadow-lg hover:bg-red-800 transition"
                >
                    Book Now
                </Link>}
            <div className="mt-16 w-full text-center">
                {/* <h2 className="text-3xl font-bold text-black mb-8">News feed</h2> */}
                <NewsFeed />
            </div>
        </section>
    );
}