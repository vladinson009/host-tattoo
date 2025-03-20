import { useState } from "react";
import context from "./context";
import { getUserSession } from "../utils/userSession";

export default function ContextProvider({ children }) {
    const { Provider } = context;
    const [userSession, setUserSession] = useState(getUserSession());
    const [globalMessage, setGlobalMessage] = useState(false);

    function tempMessage(message) {
        setGlobalMessage(message);
        setTimeout(() => {
            setGlobalMessage(false);

        }, 6000);
    }
    return (
        <Provider value={{ userSession, setUserSession, globalMessage, tempMessage }}>
            {children}
        </Provider>
    )
}