import useCreateForm from "../../hooks/useCreateForm";
import galleryService from "../../services/galleryService";
import Form from "../partials/form/Form";
import FormFieldRequirement from "../partials/form/FormFieldRequirement";
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

                <FormFieldRequirement value="Title must be at least 1 character long!" />
                <InputFormField labelName="Title" type="text" name="title" value={userInput?.title} />

                <FormFieldRequirement value="Price must be a positive number!" />
                <InputFormField labelName="Price" type="text" name="price" value={userInput?.price} />

                <FormFieldRequirement value="Description must be at least 1 character long!" />
                <TextareaFormField name="description" labelName="Description" value={userInput?.description} />

                <FormFieldRequirement value="Photo is required!" />
                <UploadFileField isPending={isPending} labelName="Upload Photo" name="image" value={userInput?.image} />

                <SubmitFormButton isPending={isPending} textContent="Create" />

            </Form>
        </>
    );
};