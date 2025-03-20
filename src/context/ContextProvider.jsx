import { useState } from "react";
import context from "./context";
import { getUserSession } from "../utils/userSession";

export default function ContextProvider({ children }) {
    const { Provider } = context;
    const [userSession, setUserSession] = useState(getUserSession());
    return (
        <Provider value={{ userSession, setUserSession }}>
            {children}
        </Provider>
    )
}