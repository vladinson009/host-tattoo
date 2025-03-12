import context from "../../context/context";
import { STUDIO_NAME, STUDIO_WELCOMEMSG } from "../../constants";
import { useContext, useEffect } from "react";
import { Link } from "react-router";
import NewsFeed from "../news-feed/NewsFeed";
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
            className="min-h-screen flex flex-col items-center justify-center text-red-600 text-center p-6 pt-18"
        >
            {/* Hero Title */}
            < div className="relative bg-[rgba(31,41,55,0.8)] py-12 px-6 rounded-lg" >
                <h1 className="sm:text-3xl md:text-4xl lg:text-6xl font-black gothic drop-shadow-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text " >{STUDIO_NAME}</h1>
                <p className="font-gothic sm:text-xl md:text-3xl lg:text-3xl mt-4 max-w-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
                    {STUDIO_WELCOMEMSG}
                </p>
                {/* Call to Action */}
                {
                    userSession &&
                    <Link to={"/booking"}
                        href="#booking"
                        className="inline-block mt-6 px-6 py-3 bg-red-600 text-black text-xl font-bold uppercase rounded-lg shadow-lg hover:bg-red-800 transition"
                    >
                        Book time
                    </Link>
                }

            </div >

        </section >
    );
}