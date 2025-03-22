import userService from "../../services/userService";

import useAuthForm from "../../hooks/useAuthForm";

import Form from "../partials/form/Form";
import InputFormField from "../partials/form/InputFormField";
import SubmitFormButton from "../partials/form/SubmitFormButton";
import FormFooter from "../partials/form/FormFooter";
import Spinner from "../partials/Spinner";
import Toast from "../partials/Toast";

export default function LoginSection() {
    const { formAction, isPending, error, userInput } = useAuthForm(userService.loginUser, userService.checkUserRoles)

    // user login form
    if (isPending) return <Spinner />
    return (
        <>
            {error && <Toast message={error} />}
            <Form name="Login" error={error} action={formAction} >
                <InputFormField labelName='Username' type='text' name='username' value={userInput?.username} />
                <InputFormField labelName='Password' type='password' name='password' />
                <SubmitFormButton isPending={isPending} textContent='Login' />
                <FormFooter text="Don't have an account?" link='/register' linkText='Register here' />
            </Form>
        </>
    );
}