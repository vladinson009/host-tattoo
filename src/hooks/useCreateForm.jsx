import { useActionState, useContext } from "react";
import { useNavigate } from "react-router";
import context from "../context/context";
import { useQueryClient } from "@tanstack/react-query";

export default function useCreateForm(apiCall, createTattoo) {
    const queryClient = useQueryClient();
    const { tempMessage, setCount } = useContext(context);
    const navigate = useNavigate();
    const [{ userInput = {}, error }, formAction, isPending] = useActionState(onAction, { userInput: null, error: null })

    // abstractive function for form submission 
    // returning formAction, pending state, error and userInput

    async function onAction(prevValue, formData) {
        const userInput = Object.fromEntries(formData)
        try {
            await apiCall(formData);
            if (createTattoo) {
                queryClient.invalidateQueries(['getGallery'])
                setCount(prev => prev + 1)
                navigate('/gallery')
                tempMessage("Tattoo project created succesfully!");

                return userInput
            }
            navigate('/news-feed');
            tempMessage("Done!");
            return userInput
        } catch (error) {
            return { error: error.message, userInput }
        }
    }
    return { formAction, isPending, error, userInput }
}