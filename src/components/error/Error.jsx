import { useLocation } from "react-router";
import ErrorComponent from "./ErrorComponent";

export default function Error() {
    const state = useLocation().state
    const error = state.message

    return (
        <ErrorComponent
            title="Something went wrong!"
            content={error + '...' || 'Page not found'}
            secondContent="Please, try again later!"
        />
    )
}