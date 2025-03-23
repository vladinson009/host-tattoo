import userService from "../../services/userService";

import useAuthForm from "../../hooks/useAuthForm";

import Form from "../partials/form/Form";
import InputFormField from "../partials/form/InputFormField";
import SubmitFormButton from "../partials/form/SubmitFormButton";
import FormFooter from "../partials/form/FormFooter";
import Spinner from "../partials/Spinner";
import Toast from "../partials/Toast";
import FormFieldRequirement from "../partials/form/FormFieldRequirement";

export default function RegisterSection() {
    const { formAction, isPending, error, userInput } = useAuthForm(userService.registerUser)
    if (isPending) return <Spinner />

    // user registration form
    return (
        <>
            {error && <Toast message={error} />}
            <Form name='Register' error={error} action={formAction}>

                <FormFieldRequirement value='Username must be at least 3 characters long!' />
                <InputFormField labelName='Username' type='text' name='username' value={userInput?.username} />

                <FormFieldRequirement value='Email must be at least 6 characters long!' />
                <InputFormField labelName='Email' type='email' name='email' value={userInput?.email} />

                <FormFieldRequirement value='Password must be at least 6 characters long!' />
                <InputFormField labelName='Password' type='password' name='password' />

                <FormFieldRequirement value='Repeat password must match password!' />
                <InputFormField labelName='Repeat Password' type='password' name='rePass' />

                <SubmitFormButton isPending={isPending} textContent={'Register'} />
                <FormFooter text="Already have an account?" link="/login" linkText="Sign in" />
            </Form>
        </>
    )
}
// username 3 char email 6 pass 6 