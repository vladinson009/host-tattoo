import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"

import userService from "../../services/userService"

import context from "../../context/context"
import { clearUserData } from "../../utils/userSession"
import Spinner from "../partials/Spinner"

export default function Logout() {
    const { setUserSession } = useContext(context)
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                await userService.logoutUser()
                navigate('/');
                setUserSession(null);
                clearUserData();

            } catch (error) {
                console.log(error);
            }
        })()

    }, [setUserSession, navigate])
    return (
        <Spinner />
    )
}