import { useState } from "react";
import context from "./context";
import { getUserSession } from "../utils/userSession";
import { setNavigate } from "../services/fetcher";
import { useNavigate } from "react-router";

export default function ContextProvider({ children }) {
    const navigate = useNavigate();
    const { Provider } = context;
    const [userSession, setUserSession] = useState(getUserSession());
    const [globalMessage, setGlobalMessage] = useState(false);
    const [count, setCount] = useState(0);
    const [isMore, setIsMore] = useState(false);
    // context provider for global data and user session

    setNavigate(() => {
        setUserSession(null);
        return navigate
    })
    function tempMessage(message) {
        setGlobalMessage(message);
        setTimeout(() => {
            setGlobalMessage(false);

        }, 6000);
    }
    return (
        <Provider value={{ userSession, setUserSession, globalMessage, tempMessage, count, setCount, isMore, setIsMore }}>
            {children}
        </Provider>
    )
}