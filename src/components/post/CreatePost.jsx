import postService from '../../services/postService';

import useCreateForm from '../../hooks/useCreateForm';

import Form from '../partials/form/Form';
import InputFormField from '../partials/form/InputFormField';
import TextareaFormField from '../partials/form/TextareaFormField';
import UploadFileField from '../partials/form/UploadFileField';
import SubmitFormButton from '../partials/form/SubmitFormButton';
import Spinner from '../partials/Spinner';

const CreatePost = () => {
    const { formAction, isPending, error, userInput } = useCreateForm(postService.createPost)
    if (isPending) return <Spinner />
    return (
        <Form name="Create a New Post" error={error} action={formAction}>
            <InputFormField labelName="Title" type="text" name="title" value={userInput?.title} />
            <TextareaFormField name="description" labelName="Description" value={userInput?.description} />
            <UploadFileField isPending={isPending} labelName="Upload Photo" name="image" />
            <SubmitFormButton isPending={isPending} textContent="Create Post" />
        </Form>
    );
};

export default CreatePost;
