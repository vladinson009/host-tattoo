import { useActionState } from "react";
import { useNavigate } from "react-router";

export default function useCreateForm(apiCall) {
    const navigate = useNavigate();
    const [{ userInput = {}, error }, formAction, isPending] = useActionState(onAction, { userInput: null, error: null })

    async function onAction(prevValue, formData) {
        const userInput = Object.fromEntries(formData)
        const controller = new AbortController()
        try {
            await apiCall(formData, controller.signal);
            navigate('/news-feed');
            return userInput
        } catch (error) {
            controller.abort();
            return { error: error.message, userInput }
        }
    }
    return { formAction, isPending, error, userInput }
}