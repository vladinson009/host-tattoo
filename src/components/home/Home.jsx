import context from "../../context/context";
import { STUDIO_NAME, STUDIO_WELCOMEMSG } from "../../constants";
import { useContext } from "react";
import { Link } from "react-router";
import RecentThree from "./RecentThree";
export default function Home() {
    const { userSession } = useContext(context);

    return (
        <>
            <section
                id="home"
                className="flex items-center justify-center text-red-600 text-center p-6 pt-30"
            >
                < div className="relative bg-[rgba(31,41,55,0.8)] py-12 px-6 rounded-lg" >
                    <h1 className="sm:text-3xl md:text-4xl lg:text-6xl font-black drop-shadow-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text " >{STUDIO_NAME}</h1>
                    <p className="font-gothic sm:text-xl md:text-3xl lg:text-3xl mt-4 max-w-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
                        {STUDIO_WELCOMEMSG}
                    </p>
                    {
                        userSession &&
                        <Link to={"/booking"}

                            className="inline-block mt-6 px-6 py-3 bg-red-600 text-black text-xl uppercase rounded-lg shadow-lg hover:bg-red-800 transition animate-bounce"
                        >
                            Book time Now
                        </Link>
                    }
                </div >
            </section >
            <RecentThree />
        </>
    );
}