import useCreateForm from "../../hooks/useCreateForm";
import galleryService from "../../services/galleryService";
import Form from "../partials/form/Form";
import InputFormField from "../partials/form/InputFormField";
import SubmitFormButton from "../partials/form/SubmitFormButton";
import TextareaFormField from "../partials/form/TextareaFormField";
import UploadFileField from "../partials/form/UploadFileField";
import Toast from "../partials/Toast";




export default function CreateTattoo() {
    const { formAction, isPending, error, userInput } = useCreateForm(galleryService.createTattoo)
    if (isPending) return <Spinner />
    return (
        <>
            {error && <Toast message={error} />}
            <Form name="Create New Tattoo" action={formAction}>
                <InputFormField labelName="Title" type="text" name="title" value={userInput?.title} />
                <TextareaFormField name="description" labelName="Description" value={userInput?.description} />
                <UploadFileField isPending={isPending} labelName="Upload Photo" name="image" />
                <SubmitFormButton isPending={isPending} textContent="Create" />
            </Form>
        </>
    );
};