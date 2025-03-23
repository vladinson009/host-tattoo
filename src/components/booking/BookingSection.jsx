import { useEffect, useState } from "react";

import contactService from "../../services/contactService";
import artistService from "../../services/artistService";
import useCreateForm from "../../hooks/useCreateForm";

import Form from "../partials/form/Form";
import SelectFormField from "../partials/form/SelectFormField";
import InputFormField from "../partials/form/InputFormField";
import TextareaFormField from "../partials/form/TextareaFormField";
import SubmitFormButton from "../partials/form/SubmitFormButton";
import FormFooter from "../partials/form/FormFooter";
import Spinner from "../partials/Spinner";
import Toast from "../partials/Toast";
import FormFieldRequirement from "../partials/form/FormFieldRequirement";

export default function BookingSection() {
    const [artists, setArtists] = useState([]);
    const { formAction, isPending, error, userInput } = useCreateForm(contactService.contactUsForm)

    // booking form with select field for artists
    useEffect(() => {
        const controller = new AbortController();
        // fetch all artists for select field
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
                <FormFieldRequirement value="Artist is requried!" />
                <SelectFormField labelName="Choose artist" name="artistId" artists={artists} />

                <FormFieldRequirement value="Topic must be at least 1 character long!!" />
                <InputFormField labelName='Topic' type='text' name='topic' value={userInput?.topic} />

                <FormFieldRequirement value="The message must be at least 1 character long!!" />
                <TextareaFormField labelName='Short message...' name='message' value={userInput?.message} />

                <SubmitFormButton isPending={isPending} textContent='Send email' />
                <FormFooter text="Wondering which artist to choose?" link='/artists' linkText='Check our artists' />
            </Form>
        </>
    )
}