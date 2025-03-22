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
    // only for artists
    // create tattoo form with input fields and upload file field 
    return (
        <>
            {error && <Toast message={error} />}
            <Form name="Create New Tattoo" action={formAction}>
                <InputFormField labelName="Title" type="text" name="title" value={userInput?.title} />
                <InputFormField labelName="Price" type="text" name="price" value={userInput?.price} />
                <TextareaFormField name="description" labelName="Description" value={userInput?.description} />
                <UploadFileField isPending={isPending} labelName="Upload Photo" name="image" value={userInput?.image} />
                <SubmitFormButton isPending={isPending} textContent="Create" />
            </Form>
        </>
    );
};