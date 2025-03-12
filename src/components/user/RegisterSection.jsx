import { useActionState, useContext } from "react"
import userApi from "../../api/userApi";
import { setUserData } from "../../utils/userSession";
import { useNavigate } from "react-router";
import context from "../../context/context";

export default function RegisterSection() {
    const { setUserSession } = useContext(context)
    const [{ error, userInput }, formAction, isPending] = useActionState(onRegister, { error: null, userInput: null });
    const navigate = useNavigate()

    async function onRegister(previousState, formData) {
        const userInput = Object.fromEntries(formData);
        try {
            const user = await userApi.registerUser(userInput);
            const userData = {
                username: userInput.username,
                email: userInput.email,
                _id: user.objectId,
                _token: user.sessionToken,
                photo: user.photo.url
            };

            setUserData(userData);
            setUserSession(userData)
            navigate('/');
            return user
        } catch (error) {
            return { error: error.message, userInput }
        }
    }
    return (
        <div className="opacity-75 min-h-screen flex flex-col items-center justify-center text-red-600 text-center p-6">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                {error && <p className="error">{error}</p>}
                <form action={formAction}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            defaultValue={userInput?.username}
                            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>  <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            defaultValue={userInput?.email}
                            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rePass" className="block text-sm font-medium text-gray-700">Repeat Password</label>
                        <input
                            type="password"
                            id="rePass"
                            name="rePass"
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-6">
                        <button disabled={isPending} type="submit" className="bg-black text-white hover:bg-red-600 hover:text-black font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer bg-black text-white hover:bg-red-600 py-3 px-6 rounded-lg">
                            Register
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-sm">
                            Already have an account? <a href="/signup" className="text-red-600 font-semibold hover:text-red-800 hover:underline hover:shadow-md transition-all duration-300 ease-in-out">Sign in</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}