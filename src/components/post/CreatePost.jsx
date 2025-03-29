import postService from '../../services/postService';

import useCreateForm from '../../hooks/useCreateForm';

import Form from '../partials/form/Form';
import InputFormField from '../partials/form/InputFormField';
import TextareaFormField from '../partials/form/TextareaFormField';
import UploadFileField from '../partials/form/UploadFileField';
import SubmitFormButton from '../partials/form/SubmitFormButton';
import Spinner from '../partials/Spinner';
import Toast from '../partials/Toast';
import FormFieldRequirement from '../partials/form/FormFieldRequirement';

export default function CreatePost() {
    const { formAction, isPending, error, userInput } = useCreateForm(postService.createPost)
    if (isPending) return <Spinner />

    // create post form using custom hook with useActionState
    return (
        <>
            {error && <Toast message={error} />}
            <Form name="Create a New Post" action={formAction}>

                <FormFieldRequirement value="Title must be at least 1 character long!" />
                <InputFormField
                    labelName="Title"
                    type="text"
                    name="title"
                    value={userInput?.title}
                    placeholder="My amazing tattoo..."
                />

                <FormFieldRequirement value="Description must be at least 1 character long!" />
                <TextareaFormField
                    labelName="Description"
                    name="description"
                    value={userInput?.description}
                    placeholder="Add descripton here..."
                />

                <FormFieldRequirement value="Photo is required!" />
                <UploadFileField isPending={isPending} labelName="Upload Photo" name="image" />
                <SubmitFormButton isPending={isPending} textContent="Share Now" />

            </Form>
        </>
    );
};


