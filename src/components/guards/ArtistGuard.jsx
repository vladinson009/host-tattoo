import { useContext } from "react";
import context from "../../context/context";
import { Navigate, Outlet } from "react-router";

// private guard to prevent access to private routes when user is not logged in
export default function ArtistGuard() {
    const { userSession } = useContext(context);
    const isArtist = userSession.role && userSession.role[0] == 'Artist'
    if (!isArtist) {
        return <Navigate to="/not-found" />
    }
    return <Outlet />

}