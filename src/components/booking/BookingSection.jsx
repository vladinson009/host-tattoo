import contactService from "../../services/contactService";

import useCreateForm from "../../hooks/useCreateForm";

import Form from "../partials/form/Form";
import SelectFormField from "../partials/form/SelectFormField";
import InputFormField from "../partials/form/InputFormField";
import TextareaFormField from "../partials/form/TextareaFormField";
import SubmitFormButton from "../partials/form/SubmitFormButton";
import FormFooter from "../partials/form/FormFooter";
import { useEffect, useState } from "react";
import artistService from "../../services/artistService";
import Spinner from "../partials/Spinner";
import Toast from "../partials/Toast";

export default function BookingSection() {
    const [artists, setArtists] = useState([]);
    const { formAction, isPending, error, userInput } = useCreateForm(contactService.contactUsForm)

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            const data = await artistService.getAllArtists(controller.signal);
            setArtists(data)
        })()
        return () => controller.abort()
    }, [])

    if (isPending) return <Spinner />
    return (
        <>
            {error && <Toast message={error} />}
            <Form name="Make Booking" action={formAction} >
                <SelectFormField labelName="Choose artist" name="artistId" artists={artists} />
                <InputFormField labelName='Topic' type='text' name='topic' value={userInput?.topic} />
                <TextareaFormField labelName='Short message...' name='message' value={userInput?.message} />
                <SubmitFormButton isPending={isPending} textContent='Send email' />
                <FormFooter text="Wondering which artist to choose?" link='/artists' linkText='Check our artists' />
            </Form>
        </>
    )
}