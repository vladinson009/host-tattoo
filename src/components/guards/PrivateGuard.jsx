import { useContext } from "react";
import context from "../../context/context";
import { Navigate, Outlet } from "react-router";

// private guard to prevent access to private routes when user is not logged in
export default function PrivateGuard() {
    const { userSession } = useContext(context);

    if (!userSession) {
        return <Navigate to="/login" />
    }
    return <Outlet />

}