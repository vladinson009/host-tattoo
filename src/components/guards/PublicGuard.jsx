import { useContext } from "react";
import context from "../../context/context";
import { Navigate, Outlet } from "react-router";

// public guard to prevent access to guest only routes when user is logged in
export default function PublicGuard() {
    const { userSession } = useContext(context);

    if (userSession) {
        return <Navigate to="/" />
    }
    return <Outlet />

}