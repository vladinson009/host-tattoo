import { useContext } from "react";
import context from "../../context/context";
import { Navigate, Outlet } from "react-router";


export default function PrivateGuard() {
    const { userSession } = useContext(context);

    if (!userSession) {
        return <Navigate to="/login" />
    }
    return <Outlet />

}