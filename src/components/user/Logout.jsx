import { Navigate } from "react-router"
import userApi from "../../api/userApi"
import context from "../../context/context"
import { useContext, useEffect } from "react"
import { clearUserData } from "../../utils/userSession"
export default function Logout() {
    const { setUserSession } = useContext(context)

    useEffect(() => {
        const controller = new AbortController();
        userApi.logoutUser(controller.signal).then(() => {
            clearUserData();
            setUserSession(null);
        })
        return () => controller.abort()
    }, [setUserSession])
    return (
        <Navigate to={'/'} />
    )
}