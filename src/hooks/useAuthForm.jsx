import { useActionState, useContext } from "react";
import { useNavigate } from "react-router";
import context from "../context/context";
import { setUserData } from "../utils/userSession";

export default function useAuthForm(apiCall, checkUserRole) {
    const navigate = useNavigate()
    const { setUserSession } = useContext(context)
    const [{ error, userInput }, formAction, isPending] = useActionState(onAction, { error: null, userInput: null });

    async function onAction(previousState, formData) {
        const userInput = Object.fromEntries(formData);
        try {
            const user = await apiCall(userInput);
            const userData = {
                username: userInput.username,
                email: user.email,
                _id: user.objectId,
                _token: user.sessionToken,
                photo: user.photo.url
            };

            if (checkUserRole) {
                const { results } = await checkUserRole(user.objectId);
                if (results.length > 0) {
                    userData.role = []
                    results.forEach((role) => {
                        userData.role.push(role.name);
                    });
                }
                // ! checkUserRole RETURNS OBJECT, with key 'results' - array with Objects
                //  results[0].name - is the role name
            }

            setUserData(userData);
            setUserSession(userData)
            navigate('/');
            return userInput
        } catch (error) {
            return { error: error.message, userInput }
        }
    }
    return { formAction, isPending, error, userInput }
}