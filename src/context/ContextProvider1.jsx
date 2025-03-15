import { useState } from "react";
import context from "./context";
import { getUserSession } from "../utils/userSession";

export default function ContextProvider({ children }) {
    const [userSession, setUserSession] = useState(getUserSession());

    const { Provider } = context;

    return (
        <Provider value={{ userSession, setUserSession }}>
            {children}
        </Provider>
    )
}