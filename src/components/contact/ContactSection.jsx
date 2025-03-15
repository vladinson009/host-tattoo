import contactApi from "../../api/contactApi";

import useCreateForm from "../../hooks/useCreateForm";

import Form from "../partials/form/Form";
import SelectFormField from "../partials/form/SelectFormField";
import InputFormField from "../partials/form/InputFormField";
import TextareaFormField from "../partials/form/textareaFormField";
import SubmitFormButton from "../partials/form/SubmitFormButton";
import FormFooter from "../partials/form/FormFooter";
import { useEffect, useState } from "react";
import artistApi from "../../api/artistApi";

export default function ContactSection() {
    const [artists, setArtists] = useState([]);
    const { formAction, isPending, error, userInput } = useCreateForm(contactApi.contactUsForm)

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            const data = await artistApi.getAllArtists(controller.signal);
            setArtists(data)
        })()
        return () => controller.abort()
    }, [])
    return (
        <Form name="Contact Us" error={error} action={formAction} >
            <SelectFormField labelName="Choose artist" name="artistId" artists={artists} />
            <InputFormField labelName='Topic' type='text' name='topic' value={userInput?.topic} />
            <TextareaFormField labelName='Message' name='message' value={userInput?.message} />
            <SubmitFormButton isPending={isPending} textContent='Send email' />
            <FormFooter text="Wondering which artist to ask?" link='/artists' linkText='Check our artists' />
        </Form>
    )
}