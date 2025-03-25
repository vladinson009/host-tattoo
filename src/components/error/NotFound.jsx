import ErrorComponent from "./ErrorComponent";

export default function NotFound() {

    return (
        <ErrorComponent
            title="404 | Page Not Found"
            content="The page you are looking for does not exist or has been moved."
            secondContent="Please, check the URL or go back to the homepage."
        />
    )
}